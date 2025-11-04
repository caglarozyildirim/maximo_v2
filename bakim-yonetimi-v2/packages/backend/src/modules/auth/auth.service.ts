import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../database/prisma';
import { config } from '../../config';
import { AppError } from '../../common/middleware/error.middleware';
import { JWTPayload } from '../../common/middleware/auth.middleware';

export class AuthService {
  async register(data: {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    primaryDepartmentId?: number;
  }) {
    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username },
        ],
      },
    });

    if (existingUser) {
      throw new AppError(400, 'Email or username already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        primaryDepartmentId: data.primaryDepartmentId,
        isActive: true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        fullName: true,
        primaryDepartment: {
          select: {
            id: true,
            departmentCode: true,
            departmentName: true,
          },
        },
        createdAt: true,
      },
    });

    return user;
  }

  async login(email: string, password: string) {
    // Find user with groups and authorizations
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        passwordHash: true,
        firstName: true,
        lastName: true,
        fullName: true,
        isActive: true,
        primaryDepartment: {
          select: {
            id: true,
            departmentCode: true,
            departmentName: true,
          },
        },
        userGroups: {
          select: {
            id: true,
            groupCode: true,
            groupName: true,
            groupType: true,
          },
        },
      },
    });

    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    if (!user.isActive) {
      throw new AppError(401, 'Account is inactive');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    // For now, use a simple permission system
    // Admin users get all permissions (*)
    const permissions = user.userGroups.some(g =>
      g.groupCode === 'ADMIN' || g.groupType === 'ADMIN'
    ) ? ['*'] : ['job_request:read', 'job_request:write'];

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.userGroups[0]?.groupCode || 'USER',
      permissions,
    };

    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    const refreshToken = jwt.sign(
      { userId: user.id },
      config.jwt.refreshSecret,
      { expiresIn: config.jwt.refreshExpiresIn }
    );

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        department: user.primaryDepartment,
        groups: user.userGroups,
      },
      accessToken,
      refreshToken,
    };
  }

  async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        fullName: true,
        phoneNumber: true,
        mobileNumber: true,
        employeeNumber: true,
        jobTitle: true,
        isActive: true,
        primaryDepartment: {
          select: {
            id: true,
            departmentCode: true,
            departmentName: true,
          },
        },
        userGroups: {
          select: {
            id: true,
            groupCode: true,
            groupName: true,
            groupType: true,
            description: true,
          },
        },
        createdAt: true,
        lastLoginAt: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as {
        userId: number;
      };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          isActive: true,
          userGroups: {
            select: {
              groupCode: true,
              groupType: true,
            },
          },
        },
      });

      if (!user || !user.isActive) {
        throw new AppError(401, 'Invalid refresh token');
      }

      // Generate new access token
      const permissions = user.userGroups.some(g =>
        g.groupCode === 'ADMIN' || g.groupType === 'ADMIN'
      ) ? ['*'] : ['job_request:read', 'job_request:write'];

      const payload: JWTPayload = {
        userId: user.id,
        email: user.email,
        role: user.userGroups[0]?.groupCode || 'USER',
        permissions,
      };

      const accessToken = jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });

      return { accessToken };
    } catch (error) {
      throw new AppError(401, 'Invalid refresh token');
    }
  }
}

export default new AuthService();