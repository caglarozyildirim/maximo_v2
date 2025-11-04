-- CreateEnum
CREATE TYPE "job_request_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "maintenance_requirement_status" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "maintenance_duty_status" AS ENUM ('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "maintenance_task_status" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "visit_status" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "incident_status" AS ENUM ('REPORTED', 'INVESTIGATING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "asset_status_type" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED', 'DISPOSED');

-- CreateEnum
CREATE TYPE "assignment_status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "record_status_type" AS ENUM ('ACTIVE', 'INACTIVE', 'DELETED');

-- CreateEnum
CREATE TYPE "priority_level" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL', 'URGENT');

-- CreateEnum
CREATE TYPE "document_status" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED', 'DELETED');

-- CreateTable
CREATE TABLE "job_requests" (
    "id" SERIAL NOT NULL,
    "request_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "job_request_status" NOT NULL DEFAULT 'PENDING',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "requested_by" INTEGER NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_to" INTEGER,
    "assigned_date" TIMESTAMP(3),
    "asset_id" INTEGER,
    "location_id" INTEGER,
    "department_id" INTEGER,
    "cost_center_id" INTEGER,
    "expected_start_date" TIMESTAMP(3),
    "expected_end_date" TIMESTAMP(3),
    "actual_start_date" TIMESTAMP(3),
    "actual_end_date" TIMESTAMP(3),
    "estimated_cost" DECIMAL(15,2),
    "actual_cost" DECIMAL(15,2),
    "approved_by" INTEGER,
    "approval_date" TIMESTAMP(3),
    "approval_notes" TEXT,
    "rejected_by" INTEGER,
    "rejection_date" TIMESTAMP(3),
    "rejection_reason" TEXT,
    "completed_by" INTEGER,
    "completion_date" TIMESTAMP(3),
    "completion_notes" TEXT,
    "work_order_number" VARCHAR(50),
    "external_reference" VARCHAR(100),
    "customer_reference" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "job_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assets" (
    "id" SERIAL NOT NULL,
    "asset_number" VARCHAR(50) NOT NULL,
    "asset_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "asset_type_id" INTEGER NOT NULL,
    "asset_status_id" INTEGER NOT NULL,
    "asset_class_id" INTEGER,
    "asset_group_header_id" INTEGER,
    "location_id" INTEGER,
    "cost_center_id" INTEGER,
    "department_id" INTEGER,
    "purchase_price" DECIMAL(15,2),
    "current_value" DECIMAL(15,2),
    "residual_value" DECIMAL(15,2),
    "depreciation_rate" DECIMAL(5,2),
    "purchase_date" TIMESTAMP(3),
    "installation_date" TIMESTAMP(3),
    "warranty_start_date" TIMESTAMP(3),
    "warranty_end_date" TIMESTAMP(3),
    "last_maintenance_date" TIMESTAMP(3),
    "next_maintenance_date" TIMESTAMP(3),
    "manufacturer" VARCHAR(255),
    "model" VARCHAR(255),
    "serial_number" VARCHAR(100),
    "supplier_name" VARCHAR(255),
    "supplier_contact" VARCHAR(255),
    "specifications" TEXT,
    "capacity" VARCHAR(100),
    "dimensions" VARCHAR(100),
    "weight" DECIMAL(10,2),
    "responsible_user_id" INTEGER,
    "parent_asset_id" INTEGER,
    "qr_code" VARCHAR(255),
    "barcode" VARCHAR(255),
    "notes" TEXT,
    "custom_field_1" VARCHAR(255),
    "custom_field_2" VARCHAR(255),
    "custom_field_3" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "id" SERIAL NOT NULL,
    "assignment_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "assignment_status" NOT NULL DEFAULT 'PENDING',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "job_request_id" INTEGER,
    "maintenance_requirement_id" INTEGER,
    "asset_id" INTEGER,
    "assigned_by" INTEGER NOT NULL,
    "assigned_to" INTEGER NOT NULL,
    "assigned_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_group_id" INTEGER,
    "scheduled_start_date" TIMESTAMP(3),
    "scheduled_end_date" TIMESTAMP(3),
    "actual_start_date" TIMESTAMP(3),
    "actual_end_date" TIMESTAMP(3),
    "accepted_date" TIMESTAMP(3),
    "rejected_date" TIMESTAMP(3),
    "rejection_reason" TEXT,
    "completion_date" TIMESTAMP(3),
    "completion_notes" TEXT,
    "estimated_hours" DECIMAL(10,2),
    "actual_hours" DECIMAL(10,2),
    "location_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_requirements" (
    "id" SERIAL NOT NULL,
    "requirement_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "maintenance_requirement_status" NOT NULL DEFAULT 'DRAFT',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "job_request_id" INTEGER,
    "asset_id" INTEGER,
    "maintenance_type" VARCHAR(100),
    "is_preventive" BOOLEAN NOT NULL DEFAULT false,
    "is_corrective" BOOLEAN NOT NULL DEFAULT false,
    "is_predictive" BOOLEAN NOT NULL DEFAULT false,
    "frequency_days" INTEGER,
    "frequency_months" INTEGER,
    "last_execution_date" TIMESTAMP(3),
    "next_execution_date" TIMESTAMP(3),
    "created_by" INTEGER NOT NULL,
    "approved_by" INTEGER,
    "approval_date" TIMESTAMP(3),
    "department_id" INTEGER,
    "cost_center_id" INTEGER,
    "estimated_cost" DECIMAL(15,2),
    "estimated_hours" DECIMAL(10,2),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maintenance_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_duties" (
    "id" SERIAL NOT NULL,
    "duty_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "maintenance_duty_status" NOT NULL DEFAULT 'PENDING',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "assignment_id" INTEGER,
    "maintenance_requirement_id" INTEGER,
    "process_id" INTEGER,
    "assigned_to" INTEGER,
    "scheduled_date" TIMESTAMP(3),
    "start_date" TIMESTAMP(3),
    "completion_date" TIMESTAMP(3),
    "estimated_hours" DECIMAL(10,2),
    "actual_hours" DECIMAL(10,2),
    "work_performed" TEXT,
    "findings" TEXT,
    "recommendations" TEXT,
    "location_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maintenance_duties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_tasks" (
    "id" SERIAL NOT NULL,
    "task_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "maintenance_task_status" NOT NULL DEFAULT 'PENDING',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "maintenance_duty_id" INTEGER NOT NULL,
    "sequence_order" INTEGER NOT NULL DEFAULT 0,
    "assigned_to" INTEGER,
    "completed_by" INTEGER,
    "completion_date" TIMESTAMP(3),
    "completion_notes" TEXT,
    "estimated_minutes" INTEGER,
    "actual_minutes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "maintenance_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "visit_number" VARCHAR(50) NOT NULL,
    "status" "visit_status" NOT NULL DEFAULT 'SCHEDULED',
    "assignment_id" INTEGER,
    "maintenance_duty_id" INTEGER,
    "asset_id" INTEGER,
    "location_id" INTEGER NOT NULL,
    "technician_id" INTEGER NOT NULL,
    "scheduled_date" TIMESTAMP(3) NOT NULL,
    "scheduled_start_time" TIMESTAMP(3),
    "scheduled_end_time" TIMESTAMP(3),
    "actual_start_time" TIMESTAMP(3),
    "actual_end_time" TIMESTAMP(3),
    "purpose" TEXT,
    "findings" TEXT,
    "work_performed" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consumed_materials" (
    "id" SERIAL NOT NULL,
    "maintenance_duty_id" INTEGER,
    "visit_id" INTEGER,
    "asset_id" INTEGER,
    "material_code" VARCHAR(100) NOT NULL,
    "material_name" VARCHAR(255) NOT NULL,
    "material_description" TEXT,
    "quantity" DECIMAL(15,3) NOT NULL,
    "measure_unit_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(15,2),
    "total_price" DECIMAL(15,2),
    "consumed_by" INTEGER NOT NULL,
    "consumed_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "consumed_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" SERIAL NOT NULL,
    "incident_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "incident_status" NOT NULL DEFAULT 'REPORTED',
    "priority" "priority_level" NOT NULL DEFAULT 'MEDIUM',
    "job_request_id" INTEGER,
    "asset_id" INTEGER,
    "location_id" INTEGER,
    "incident_type" VARCHAR(100),
    "incident_category" VARCHAR(100),
    "severity" VARCHAR(50),
    "reported_by" INTEGER NOT NULL,
    "reported_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_to" INTEGER,
    "assigned_date" TIMESTAMP(3),
    "incident_date" TIMESTAMP(3),
    "acknowledged_date" TIMESTAMP(3),
    "investigation_start_date" TIMESTAMP(3),
    "resolution_date" TIMESTAMP(3),
    "closed_date" TIMESTAMP(3),
    "resolved_by" INTEGER,
    "resolution_description" TEXT,
    "root_cause" TEXT,
    "corrective_action" TEXT,
    "preventive_action" TEXT,
    "downtime" DECIMAL(10,2),
    "estimated_cost" DECIMAL(15,2),
    "actual_cost" DECIMAL(15,2),
    "is_safety_incident" BOOLEAN NOT NULL DEFAULT false,
    "injury_occurred" BOOLEAN NOT NULL DEFAULT false,
    "department_id" INTEGER,
    "cost_center_id" INTEGER,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_group_headers" (
    "id" SERIAL NOT NULL,
    "group_code" VARCHAR(50) NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_group_id" INTEGER,
    "responsible_user_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "asset_group_headers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_group_items" (
    "id" SERIAL NOT NULL,
    "asset_group_header_id" INTEGER NOT NULL,
    "item_code" VARCHAR(50) NOT NULL,
    "item_name" VARCHAR(255) NOT NULL,
    "item_description" TEXT,
    "quantity" INTEGER,
    "measure_unit_id" INTEGER,
    "specifications" TEXT,
    "sequence_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "asset_group_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_retirements" (
    "id" SERIAL NOT NULL,
    "retirement_number" VARCHAR(50) NOT NULL,
    "asset_id" INTEGER NOT NULL,
    "retiring_method_id" INTEGER NOT NULL,
    "retirement_date" TIMESTAMP(3) NOT NULL,
    "retirement_reason" TEXT NOT NULL,
    "book_value" DECIMAL(15,2),
    "salvage_value" DECIMAL(15,2),
    "disposal_cost" DECIMAL(15,2),
    "gain_loss" DECIMAL(15,2),
    "buyer_name" VARCHAR(255),
    "buyer_contact" VARCHAR(255),
    "sale_price" DECIMAL(15,2),
    "sale_date" TIMESTAMP(3),
    "disposal_location" VARCHAR(255),
    "disposal_method" VARCHAR(255),
    "disposal_company" VARCHAR(255),
    "disposal_date" TIMESTAMP(3),
    "environmental_compliance" BOOLEAN,
    "compliance_notes" TEXT,
    "approved_by" INTEGER,
    "approval_date" TIMESTAMP(3),
    "initiated_by" INTEGER NOT NULL,
    "certificate_number" VARCHAR(100),
    "certificate_date" TIMESTAMP(3),
    "notes" TEXT,
    "department_id" INTEGER,
    "cost_center_id" INTEGER,
    "warranty_status" VARCHAR(100),
    "insurance_status" VARCHAR(100),
    "legal_status" VARCHAR(100),
    "physical_condition" TEXT,
    "functional_status" TEXT,
    "replacement_asset_id" INTEGER,
    "replacement_planned" BOOLEAN NOT NULL DEFAULT false,
    "replacement_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "asset_retirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_center_changes" (
    "id" SERIAL NOT NULL,
    "old_cost_center_id" INTEGER,
    "new_cost_center_id" INTEGER NOT NULL,
    "change_date" TIMESTAMP(3) NOT NULL,
    "change_reason" TEXT,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "changed_by" INTEGER NOT NULL,
    "approved_by" INTEGER,
    "approval_date" TIMESTAMP(3),
    "reference_type" VARCHAR(50) NOT NULL,
    "reference_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_center_changes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(50),
    "mobile_number" VARCHAR(50),
    "employee_number" VARCHAR(50),
    "job_title" VARCHAR(255),
    "primary_department_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_locked" BOOLEAN NOT NULL DEFAULT false,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "last_login_at" TIMESTAMP(3),
    "last_login_ip" VARCHAR(50),
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "password_reset_token" VARCHAR(255),
    "password_reset_expiry" TIMESTAMP(3),
    "profile_picture" VARCHAR(500),
    "bio" TEXT,
    "language" VARCHAR(10) NOT NULL DEFAULT 'tr',
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Europe/Istanbul',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "department_code" VARCHAR(50) NOT NULL,
    "department_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_department_id" INTEGER,
    "manager_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_department_assignments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "role" VARCHAR(100),
    "assigned_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_department_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_centers" (
    "id" SERIAL NOT NULL,
    "cost_center_code" VARCHAR(50) NOT NULL,
    "cost_center_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_cost_center_id" INTEGER,
    "budget" DECIMAL(15,2),
    "budget_year" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cost_centers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_center_responsibles" (
    "id" SERIAL NOT NULL,
    "cost_center_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "department_id" INTEGER,
    "responsibility_type" VARCHAR(100),
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cost_center_responsibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_groups" (
    "id" SERIAL NOT NULL,
    "group_code" VARCHAR(50) NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "group_type" VARCHAR(50),
    "parent_group_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorizations" (
    "id" SERIAL NOT NULL,
    "authorization_code" VARCHAR(50) NOT NULL,
    "authorization_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "authorization_type" VARCHAR(50) NOT NULL,
    "resource_name" VARCHAR(255),
    "action_name" VARCHAR(100),
    "parent_authorization_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authorization_groups" (
    "id" SERIAL NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authorization_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location_code" VARCHAR(50) NOT NULL,
    "location_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "address" VARCHAR(500),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "country" VARCHAR(100),
    "postal_code" VARCHAR(20),
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "parent_location_id" INTEGER,
    "location_type" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "priorities" (
    "id" SERIAL NOT NULL,
    "priority_code" VARCHAR(50) NOT NULL,
    "priority_name" VARCHAR(100) NOT NULL,
    "priority_level" INTEGER NOT NULL,
    "description" TEXT,
    "response_sla_hours" INTEGER,
    "resolution_sla_hours" INTEGER,
    "color" VARCHAR(20),
    "icon" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_statuses" (
    "id" SERIAL NOT NULL,
    "status_code" VARCHAR(50) NOT NULL,
    "status_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "status_type" "record_status_type" NOT NULL,
    "color" VARCHAR(20),
    "icon" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "record_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_types" (
    "id" SERIAL NOT NULL,
    "type_code" VARCHAR(50) NOT NULL,
    "type_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_type_id" INTEGER,
    "category" VARCHAR(100),
    "default_depreciation_rate" DECIMAL(5,2),
    "default_lifespan_years" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_statuses" (
    "id" SERIAL NOT NULL,
    "status_code" VARCHAR(50) NOT NULL,
    "status_name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "status_type" "asset_status_type" NOT NULL,
    "is_available_for_use" BOOLEAN NOT NULL DEFAULT true,
    "color" VARCHAR(20),
    "icon" VARCHAR(50),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measure_units" (
    "id" SERIAL NOT NULL,
    "unit_code" VARCHAR(20) NOT NULL,
    "unit_name" VARCHAR(100) NOT NULL,
    "unit_symbol" VARCHAR(20),
    "description" TEXT,
    "unit_type" VARCHAR(50),
    "base_unit_id" INTEGER,
    "conversion_factor" DECIMAL(15,6),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "measure_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" SERIAL NOT NULL,
    "process_code" VARCHAR(50) NOT NULL,
    "process_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "process_type" VARCHAR(100),
    "process_category" VARCHAR(100),
    "parent_process_id" INTEGER,
    "estimated_duration" INTEGER,
    "duration_unit" VARCHAR(20),
    "instructions" TEXT,
    "safety_notes" TEXT,
    "sequence_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_retiring_methods" (
    "id" SERIAL NOT NULL,
    "method_code" VARCHAR(50) NOT NULL,
    "method_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "method_type" VARCHAR(50),
    "requires_compliance" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_retiring_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset_class_descriptions" (
    "id" SERIAL NOT NULL,
    "class_code" VARCHAR(50) NOT NULL,
    "class_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_class_id" INTEGER,
    "class_level" INTEGER NOT NULL DEFAULT 1,
    "class_path" VARCHAR(500),
    "accounting_code" VARCHAR(50),
    "depreciation_method" VARCHAR(50),
    "default_depreciation_rate" DECIMAL(5,2),
    "useful_life_years" INTEGER,
    "tax_category" VARCHAR(50),
    "tax_rate" DECIMAL(5,2),
    "insurance_category" VARCHAR(100),
    "insurance_required" BOOLEAN NOT NULL DEFAULT false,
    "requires_regular_maintenance" BOOLEAN NOT NULL DEFAULT true,
    "default_maintenance_interval" INTEGER,
    "attributes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asset_class_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstations" (
    "id" SERIAL NOT NULL,
    "workstation_code" VARCHAR(50) NOT NULL,
    "workstation_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "user_id" INTEGER,
    "location_id" INTEGER,
    "device_type" VARCHAR(100),
    "ip_address" VARCHAR(50),
    "mac_address" VARCHAR(50),
    "hostname" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_active_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workstations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_groups" (
    "id" SERIAL NOT NULL,
    "group_code" VARCHAR(50) NOT NULL,
    "group_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "parent_group_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_types" (
    "id" SERIAL NOT NULL,
    "type_code" VARCHAR(50) NOT NULL,
    "type_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "allowed_extensions" VARCHAR(255),
    "max_file_size_mb" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "document_number" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "document_type_id" INTEGER NOT NULL,
    "document_group_id" INTEGER,
    "file_name" VARCHAR(255) NOT NULL,
    "file_extension" VARCHAR(20) NOT NULL,
    "file_path" VARCHAR(1000) NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" VARCHAR(100),
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "version_notes" TEXT,
    "status" "document_status" NOT NULL DEFAULT 'ACTIVE',
    "uploaded_by" INTEGER NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "related_entity_type" VARCHAR(50),
    "related_entity_id" INTEGER,
    "job_request_id" INTEGER,
    "asset_id" INTEGER,
    "assignment_id" INTEGER,
    "maintenance_requirement_id" INTEGER,
    "maintenance_duty_id" INTEGER,
    "incident_id" INTEGER,
    "asset_retirement_id" INTEGER,
    "tags" VARCHAR(500),
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "access_level" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "comment_text" TEXT NOT NULL,
    "commented_by" INTEGER NOT NULL,
    "commented_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "related_entity_type" VARCHAR(50) NOT NULL,
    "related_entity_id" INTEGER NOT NULL,
    "job_request_id" INTEGER,
    "asset_id" INTEGER,
    "assignment_id" INTEGER,
    "maintenance_requirement_id" INTEGER,
    "maintenance_duty_id" INTEGER,
    "maintenance_task_id" INTEGER,
    "visit_id" INTEGER,
    "incident_id" INTEGER,
    "asset_retirement_id" INTEGER,
    "parent_comment_id" INTEGER,
    "is_edited" BOOLEAN NOT NULL DEFAULT false,
    "edited_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "language_texts" (
    "id" SERIAL NOT NULL,
    "text_key" VARCHAR(255) NOT NULL,
    "language_code" VARCHAR(10) NOT NULL,
    "text_value" TEXT NOT NULL,
    "context" VARCHAR(100),
    "translator_notes" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "language_texts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "on_behalf" (
    "id" SERIAL NOT NULL,
    "requestor_id" INTEGER NOT NULL,
    "delegate_id" INTEGER NOT NULL,
    "scope" VARCHAR(255),
    "permissions" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "approved_by" INTEGER,
    "approval_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "on_behalf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "on_behalf_logs" (
    "id" SERIAL NOT NULL,
    "on_behalf_id" INTEGER NOT NULL,
    "action_type" VARCHAR(100) NOT NULL,
    "action_description" TEXT,
    "entity_type" VARCHAR(50),
    "entity_id" INTEGER,
    "performed_by" INTEGER NOT NULL,
    "performed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip_address" VARCHAR(50),
    "user_agent" VARCHAR(500),
    "metadata" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "on_behalf_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_modules" (
    "id" SERIAL NOT NULL,
    "module_name" VARCHAR(100) NOT NULL,
    "module_code" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "settings" TEXT,
    "is_enabled" BOOLEAN NOT NULL DEFAULT true,
    "version" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserGroupMembers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupAuthorizations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserGroupAuthorizations" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "job_requests_request_number_key" ON "job_requests"("request_number");

-- CreateIndex
CREATE INDEX "job_requests_request_number_idx" ON "job_requests"("request_number");

-- CreateIndex
CREATE INDEX "job_requests_status_idx" ON "job_requests"("status");

-- CreateIndex
CREATE INDEX "job_requests_priority_idx" ON "job_requests"("priority");

-- CreateIndex
CREATE INDEX "job_requests_requested_by_idx" ON "job_requests"("requested_by");

-- CreateIndex
CREATE INDEX "job_requests_assigned_to_idx" ON "job_requests"("assigned_to");

-- CreateIndex
CREATE INDEX "job_requests_asset_id_idx" ON "job_requests"("asset_id");

-- CreateIndex
CREATE INDEX "job_requests_location_id_idx" ON "job_requests"("location_id");

-- CreateIndex
CREATE INDEX "job_requests_department_id_idx" ON "job_requests"("department_id");

-- CreateIndex
CREATE INDEX "job_requests_request_date_idx" ON "job_requests"("request_date");

-- CreateIndex
CREATE INDEX "job_requests_created_at_idx" ON "job_requests"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "assets_asset_number_key" ON "assets"("asset_number");

-- CreateIndex
CREATE INDEX "assets_asset_number_idx" ON "assets"("asset_number");

-- CreateIndex
CREATE INDEX "assets_asset_name_idx" ON "assets"("asset_name");

-- CreateIndex
CREATE INDEX "assets_asset_type_id_idx" ON "assets"("asset_type_id");

-- CreateIndex
CREATE INDEX "assets_asset_status_id_idx" ON "assets"("asset_status_id");

-- CreateIndex
CREATE INDEX "assets_location_id_idx" ON "assets"("location_id");

-- CreateIndex
CREATE INDEX "assets_cost_center_id_idx" ON "assets"("cost_center_id");

-- CreateIndex
CREATE INDEX "assets_department_id_idx" ON "assets"("department_id");

-- CreateIndex
CREATE INDEX "assets_responsible_user_id_idx" ON "assets"("responsible_user_id");

-- CreateIndex
CREATE INDEX "assets_parent_asset_id_idx" ON "assets"("parent_asset_id");

-- CreateIndex
CREATE INDEX "assets_serial_number_idx" ON "assets"("serial_number");

-- CreateIndex
CREATE INDEX "assets_created_at_idx" ON "assets"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "assignments_assignment_number_key" ON "assignments"("assignment_number");

-- CreateIndex
CREATE INDEX "assignments_assignment_number_idx" ON "assignments"("assignment_number");

-- CreateIndex
CREATE INDEX "assignments_status_idx" ON "assignments"("status");

-- CreateIndex
CREATE INDEX "assignments_priority_idx" ON "assignments"("priority");

-- CreateIndex
CREATE INDEX "assignments_job_request_id_idx" ON "assignments"("job_request_id");

-- CreateIndex
CREATE INDEX "assignments_maintenance_requirement_id_idx" ON "assignments"("maintenance_requirement_id");

-- CreateIndex
CREATE INDEX "assignments_asset_id_idx" ON "assignments"("asset_id");

-- CreateIndex
CREATE INDEX "assignments_assigned_by_idx" ON "assignments"("assigned_by");

-- CreateIndex
CREATE INDEX "assignments_assigned_to_idx" ON "assignments"("assigned_to");

-- CreateIndex
CREATE INDEX "assignments_user_group_id_idx" ON "assignments"("user_group_id");

-- CreateIndex
CREATE INDEX "assignments_assigned_date_idx" ON "assignments"("assigned_date");

-- CreateIndex
CREATE INDEX "assignments_created_at_idx" ON "assignments"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_requirements_requirement_number_key" ON "maintenance_requirements"("requirement_number");

-- CreateIndex
CREATE INDEX "maintenance_requirements_requirement_number_idx" ON "maintenance_requirements"("requirement_number");

-- CreateIndex
CREATE INDEX "maintenance_requirements_status_idx" ON "maintenance_requirements"("status");

-- CreateIndex
CREATE INDEX "maintenance_requirements_priority_idx" ON "maintenance_requirements"("priority");

-- CreateIndex
CREATE INDEX "maintenance_requirements_job_request_id_idx" ON "maintenance_requirements"("job_request_id");

-- CreateIndex
CREATE INDEX "maintenance_requirements_asset_id_idx" ON "maintenance_requirements"("asset_id");

-- CreateIndex
CREATE INDEX "maintenance_requirements_created_by_idx" ON "maintenance_requirements"("created_by");

-- CreateIndex
CREATE INDEX "maintenance_requirements_approved_by_idx" ON "maintenance_requirements"("approved_by");

-- CreateIndex
CREATE INDEX "maintenance_requirements_next_execution_date_idx" ON "maintenance_requirements"("next_execution_date");

-- CreateIndex
CREATE INDEX "maintenance_requirements_created_at_idx" ON "maintenance_requirements"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_duties_duty_number_key" ON "maintenance_duties"("duty_number");

-- CreateIndex
CREATE INDEX "maintenance_duties_duty_number_idx" ON "maintenance_duties"("duty_number");

-- CreateIndex
CREATE INDEX "maintenance_duties_status_idx" ON "maintenance_duties"("status");

-- CreateIndex
CREATE INDEX "maintenance_duties_priority_idx" ON "maintenance_duties"("priority");

-- CreateIndex
CREATE INDEX "maintenance_duties_assignment_id_idx" ON "maintenance_duties"("assignment_id");

-- CreateIndex
CREATE INDEX "maintenance_duties_maintenance_requirement_id_idx" ON "maintenance_duties"("maintenance_requirement_id");

-- CreateIndex
CREATE INDEX "maintenance_duties_process_id_idx" ON "maintenance_duties"("process_id");

-- CreateIndex
CREATE INDEX "maintenance_duties_assigned_to_idx" ON "maintenance_duties"("assigned_to");

-- CreateIndex
CREATE INDEX "maintenance_duties_scheduled_date_idx" ON "maintenance_duties"("scheduled_date");

-- CreateIndex
CREATE INDEX "maintenance_duties_created_at_idx" ON "maintenance_duties"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_tasks_task_number_key" ON "maintenance_tasks"("task_number");

-- CreateIndex
CREATE INDEX "maintenance_tasks_task_number_idx" ON "maintenance_tasks"("task_number");

-- CreateIndex
CREATE INDEX "maintenance_tasks_status_idx" ON "maintenance_tasks"("status");

-- CreateIndex
CREATE INDEX "maintenance_tasks_maintenance_duty_id_idx" ON "maintenance_tasks"("maintenance_duty_id");

-- CreateIndex
CREATE INDEX "maintenance_tasks_assigned_to_idx" ON "maintenance_tasks"("assigned_to");

-- CreateIndex
CREATE INDEX "maintenance_tasks_sequence_order_idx" ON "maintenance_tasks"("sequence_order");

-- CreateIndex
CREATE INDEX "maintenance_tasks_created_at_idx" ON "maintenance_tasks"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "visits_visit_number_key" ON "visits"("visit_number");

-- CreateIndex
CREATE INDEX "visits_visit_number_idx" ON "visits"("visit_number");

-- CreateIndex
CREATE INDEX "visits_status_idx" ON "visits"("status");

-- CreateIndex
CREATE INDEX "visits_assignment_id_idx" ON "visits"("assignment_id");

-- CreateIndex
CREATE INDEX "visits_maintenance_duty_id_idx" ON "visits"("maintenance_duty_id");

-- CreateIndex
CREATE INDEX "visits_asset_id_idx" ON "visits"("asset_id");

-- CreateIndex
CREATE INDEX "visits_location_id_idx" ON "visits"("location_id");

-- CreateIndex
CREATE INDEX "visits_technician_id_idx" ON "visits"("technician_id");

-- CreateIndex
CREATE INDEX "visits_scheduled_date_idx" ON "visits"("scheduled_date");

-- CreateIndex
CREATE INDEX "visits_created_at_idx" ON "visits"("created_at");

-- CreateIndex
CREATE INDEX "consumed_materials_maintenance_duty_id_idx" ON "consumed_materials"("maintenance_duty_id");

-- CreateIndex
CREATE INDEX "consumed_materials_visit_id_idx" ON "consumed_materials"("visit_id");

-- CreateIndex
CREATE INDEX "consumed_materials_asset_id_idx" ON "consumed_materials"("asset_id");

-- CreateIndex
CREATE INDEX "consumed_materials_material_code_idx" ON "consumed_materials"("material_code");

-- CreateIndex
CREATE INDEX "consumed_materials_consumed_by_idx" ON "consumed_materials"("consumed_by");

-- CreateIndex
CREATE INDEX "consumed_materials_consumed_date_idx" ON "consumed_materials"("consumed_date");

-- CreateIndex
CREATE INDEX "consumed_materials_created_at_idx" ON "consumed_materials"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "incidents_incident_number_key" ON "incidents"("incident_number");

-- CreateIndex
CREATE INDEX "incidents_incident_number_idx" ON "incidents"("incident_number");

-- CreateIndex
CREATE INDEX "incidents_status_idx" ON "incidents"("status");

-- CreateIndex
CREATE INDEX "incidents_priority_idx" ON "incidents"("priority");

-- CreateIndex
CREATE INDEX "incidents_job_request_id_idx" ON "incidents"("job_request_id");

-- CreateIndex
CREATE INDEX "incidents_asset_id_idx" ON "incidents"("asset_id");

-- CreateIndex
CREATE INDEX "incidents_location_id_idx" ON "incidents"("location_id");

-- CreateIndex
CREATE INDEX "incidents_reported_by_idx" ON "incidents"("reported_by");

-- CreateIndex
CREATE INDEX "incidents_assigned_to_idx" ON "incidents"("assigned_to");

-- CreateIndex
CREATE INDEX "incidents_reported_date_idx" ON "incidents"("reported_date");

-- CreateIndex
CREATE INDEX "incidents_incident_date_idx" ON "incidents"("incident_date");

-- CreateIndex
CREATE INDEX "incidents_created_at_idx" ON "incidents"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_group_headers_group_code_key" ON "asset_group_headers"("group_code");

-- CreateIndex
CREATE INDEX "asset_group_headers_group_code_idx" ON "asset_group_headers"("group_code");

-- CreateIndex
CREATE INDEX "asset_group_headers_group_name_idx" ON "asset_group_headers"("group_name");

-- CreateIndex
CREATE INDEX "asset_group_headers_parent_group_id_idx" ON "asset_group_headers"("parent_group_id");

-- CreateIndex
CREATE INDEX "asset_group_headers_responsible_user_id_idx" ON "asset_group_headers"("responsible_user_id");

-- CreateIndex
CREATE INDEX "asset_group_headers_created_at_idx" ON "asset_group_headers"("created_at");

-- CreateIndex
CREATE INDEX "asset_group_items_asset_group_header_id_idx" ON "asset_group_items"("asset_group_header_id");

-- CreateIndex
CREATE INDEX "asset_group_items_item_code_idx" ON "asset_group_items"("item_code");

-- CreateIndex
CREATE INDEX "asset_group_items_item_name_idx" ON "asset_group_items"("item_name");

-- CreateIndex
CREATE INDEX "asset_group_items_sequence_order_idx" ON "asset_group_items"("sequence_order");

-- CreateIndex
CREATE INDEX "asset_group_items_created_at_idx" ON "asset_group_items"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_retirements_retirement_number_key" ON "asset_retirements"("retirement_number");

-- CreateIndex
CREATE INDEX "asset_retirements_retirement_number_idx" ON "asset_retirements"("retirement_number");

-- CreateIndex
CREATE INDEX "asset_retirements_asset_id_idx" ON "asset_retirements"("asset_id");

-- CreateIndex
CREATE INDEX "asset_retirements_retiring_method_id_idx" ON "asset_retirements"("retiring_method_id");

-- CreateIndex
CREATE INDEX "asset_retirements_retirement_date_idx" ON "asset_retirements"("retirement_date");

-- CreateIndex
CREATE INDEX "asset_retirements_approved_by_idx" ON "asset_retirements"("approved_by");

-- CreateIndex
CREATE INDEX "asset_retirements_initiated_by_idx" ON "asset_retirements"("initiated_by");

-- CreateIndex
CREATE INDEX "asset_retirements_created_at_idx" ON "asset_retirements"("created_at");

-- CreateIndex
CREATE INDEX "cost_center_changes_old_cost_center_id_idx" ON "cost_center_changes"("old_cost_center_id");

-- CreateIndex
CREATE INDEX "cost_center_changes_new_cost_center_id_idx" ON "cost_center_changes"("new_cost_center_id");

-- CreateIndex
CREATE INDEX "cost_center_changes_change_date_idx" ON "cost_center_changes"("change_date");

-- CreateIndex
CREATE INDEX "cost_center_changes_changed_by_idx" ON "cost_center_changes"("changed_by");

-- CreateIndex
CREATE INDEX "cost_center_changes_reference_type_reference_id_idx" ON "cost_center_changes"("reference_type", "reference_id");

-- CreateIndex
CREATE INDEX "cost_center_changes_created_at_idx" ON "cost_center_changes"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_employee_number_key" ON "users"("employee_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_password_reset_token_key" ON "users"("password_reset_token");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_employee_number_idx" ON "users"("employee_number");

-- CreateIndex
CREATE INDEX "users_is_active_idx" ON "users"("is_active");

-- CreateIndex
CREATE INDEX "users_primary_department_id_idx" ON "users"("primary_department_id");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "departments_department_code_key" ON "departments"("department_code");

-- CreateIndex
CREATE INDEX "departments_department_code_idx" ON "departments"("department_code");

-- CreateIndex
CREATE INDEX "departments_department_name_idx" ON "departments"("department_name");

-- CreateIndex
CREATE INDEX "departments_parent_department_id_idx" ON "departments"("parent_department_id");

-- CreateIndex
CREATE INDEX "departments_manager_id_idx" ON "departments"("manager_id");

-- CreateIndex
CREATE INDEX "departments_is_active_idx" ON "departments"("is_active");

-- CreateIndex
CREATE INDEX "departments_created_at_idx" ON "departments"("created_at");

-- CreateIndex
CREATE INDEX "user_department_assignments_user_id_idx" ON "user_department_assignments"("user_id");

-- CreateIndex
CREATE INDEX "user_department_assignments_department_id_idx" ON "user_department_assignments"("department_id");

-- CreateIndex
CREATE INDEX "user_department_assignments_is_active_idx" ON "user_department_assignments"("is_active");

-- CreateIndex
CREATE INDEX "user_department_assignments_is_primary_idx" ON "user_department_assignments"("is_primary");

-- CreateIndex
CREATE INDEX "user_department_assignments_created_at_idx" ON "user_department_assignments"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_department_assignments_user_id_department_id_key" ON "user_department_assignments"("user_id", "department_id");

-- CreateIndex
CREATE UNIQUE INDEX "cost_centers_cost_center_code_key" ON "cost_centers"("cost_center_code");

-- CreateIndex
CREATE INDEX "cost_centers_cost_center_code_idx" ON "cost_centers"("cost_center_code");

-- CreateIndex
CREATE INDEX "cost_centers_cost_center_name_idx" ON "cost_centers"("cost_center_name");

-- CreateIndex
CREATE INDEX "cost_centers_parent_cost_center_id_idx" ON "cost_centers"("parent_cost_center_id");

-- CreateIndex
CREATE INDEX "cost_centers_is_active_idx" ON "cost_centers"("is_active");

-- CreateIndex
CREATE INDEX "cost_centers_created_at_idx" ON "cost_centers"("created_at");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_cost_center_id_idx" ON "cost_center_responsibles"("cost_center_id");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_user_id_idx" ON "cost_center_responsibles"("user_id");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_department_id_idx" ON "cost_center_responsibles"("department_id");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_is_active_idx" ON "cost_center_responsibles"("is_active");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_is_primary_idx" ON "cost_center_responsibles"("is_primary");

-- CreateIndex
CREATE INDEX "cost_center_responsibles_created_at_idx" ON "cost_center_responsibles"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "cost_center_responsibles_cost_center_id_user_id_key" ON "cost_center_responsibles"("cost_center_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_groups_group_code_key" ON "user_groups"("group_code");

-- CreateIndex
CREATE INDEX "user_groups_group_code_idx" ON "user_groups"("group_code");

-- CreateIndex
CREATE INDEX "user_groups_group_name_idx" ON "user_groups"("group_name");

-- CreateIndex
CREATE INDEX "user_groups_group_type_idx" ON "user_groups"("group_type");

-- CreateIndex
CREATE INDEX "user_groups_parent_group_id_idx" ON "user_groups"("parent_group_id");

-- CreateIndex
CREATE INDEX "user_groups_is_active_idx" ON "user_groups"("is_active");

-- CreateIndex
CREATE INDEX "user_groups_created_at_idx" ON "user_groups"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "authorizations_authorization_code_key" ON "authorizations"("authorization_code");

-- CreateIndex
CREATE INDEX "authorizations_authorization_code_idx" ON "authorizations"("authorization_code");

-- CreateIndex
CREATE INDEX "authorizations_authorization_name_idx" ON "authorizations"("authorization_name");

-- CreateIndex
CREATE INDEX "authorizations_authorization_type_idx" ON "authorizations"("authorization_type");

-- CreateIndex
CREATE INDEX "authorizations_resource_name_idx" ON "authorizations"("resource_name");

-- CreateIndex
CREATE INDEX "authorizations_parent_authorization_id_idx" ON "authorizations"("parent_authorization_id");

-- CreateIndex
CREATE INDEX "authorizations_is_active_idx" ON "authorizations"("is_active");

-- CreateIndex
CREATE INDEX "authorizations_created_at_idx" ON "authorizations"("created_at");

-- CreateIndex
CREATE INDEX "authorization_groups_group_name_idx" ON "authorization_groups"("group_name");

-- CreateIndex
CREATE INDEX "authorization_groups_is_active_idx" ON "authorization_groups"("is_active");

-- CreateIndex
CREATE INDEX "authorization_groups_created_at_idx" ON "authorization_groups"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "locations_location_code_key" ON "locations"("location_code");

-- CreateIndex
CREATE INDEX "locations_location_code_idx" ON "locations"("location_code");

-- CreateIndex
CREATE INDEX "locations_location_name_idx" ON "locations"("location_name");

-- CreateIndex
CREATE INDEX "locations_city_idx" ON "locations"("city");

-- CreateIndex
CREATE INDEX "locations_location_type_idx" ON "locations"("location_type");

-- CreateIndex
CREATE INDEX "locations_parent_location_id_idx" ON "locations"("parent_location_id");

-- CreateIndex
CREATE INDEX "locations_is_active_idx" ON "locations"("is_active");

-- CreateIndex
CREATE INDEX "locations_created_at_idx" ON "locations"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "priorities_priority_code_key" ON "priorities"("priority_code");

-- CreateIndex
CREATE INDEX "priorities_priority_code_idx" ON "priorities"("priority_code");

-- CreateIndex
CREATE INDEX "priorities_priority_level_idx" ON "priorities"("priority_level");

-- CreateIndex
CREATE INDEX "priorities_is_active_idx" ON "priorities"("is_active");

-- CreateIndex
CREATE INDEX "priorities_created_at_idx" ON "priorities"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "record_statuses_status_code_key" ON "record_statuses"("status_code");

-- CreateIndex
CREATE INDEX "record_statuses_status_code_idx" ON "record_statuses"("status_code");

-- CreateIndex
CREATE INDEX "record_statuses_status_type_idx" ON "record_statuses"("status_type");

-- CreateIndex
CREATE INDEX "record_statuses_created_at_idx" ON "record_statuses"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_types_type_code_key" ON "asset_types"("type_code");

-- CreateIndex
CREATE INDEX "asset_types_type_code_idx" ON "asset_types"("type_code");

-- CreateIndex
CREATE INDEX "asset_types_type_name_idx" ON "asset_types"("type_name");

-- CreateIndex
CREATE INDEX "asset_types_category_idx" ON "asset_types"("category");

-- CreateIndex
CREATE INDEX "asset_types_parent_type_id_idx" ON "asset_types"("parent_type_id");

-- CreateIndex
CREATE INDEX "asset_types_is_active_idx" ON "asset_types"("is_active");

-- CreateIndex
CREATE INDEX "asset_types_created_at_idx" ON "asset_types"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_statuses_status_code_key" ON "asset_statuses"("status_code");

-- CreateIndex
CREATE INDEX "asset_statuses_status_code_idx" ON "asset_statuses"("status_code");

-- CreateIndex
CREATE INDEX "asset_statuses_status_type_idx" ON "asset_statuses"("status_type");

-- CreateIndex
CREATE INDEX "asset_statuses_is_active_idx" ON "asset_statuses"("is_active");

-- CreateIndex
CREATE INDEX "asset_statuses_created_at_idx" ON "asset_statuses"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "measure_units_unit_code_key" ON "measure_units"("unit_code");

-- CreateIndex
CREATE INDEX "measure_units_unit_code_idx" ON "measure_units"("unit_code");

-- CreateIndex
CREATE INDEX "measure_units_unit_name_idx" ON "measure_units"("unit_name");

-- CreateIndex
CREATE INDEX "measure_units_unit_type_idx" ON "measure_units"("unit_type");

-- CreateIndex
CREATE INDEX "measure_units_is_active_idx" ON "measure_units"("is_active");

-- CreateIndex
CREATE INDEX "measure_units_created_at_idx" ON "measure_units"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "processes_process_code_key" ON "processes"("process_code");

-- CreateIndex
CREATE INDEX "processes_process_code_idx" ON "processes"("process_code");

-- CreateIndex
CREATE INDEX "processes_process_name_idx" ON "processes"("process_name");

-- CreateIndex
CREATE INDEX "processes_process_type_idx" ON "processes"("process_type");

-- CreateIndex
CREATE INDEX "processes_process_category_idx" ON "processes"("process_category");

-- CreateIndex
CREATE INDEX "processes_parent_process_id_idx" ON "processes"("parent_process_id");

-- CreateIndex
CREATE INDEX "processes_sequence_order_idx" ON "processes"("sequence_order");

-- CreateIndex
CREATE INDEX "processes_is_active_idx" ON "processes"("is_active");

-- CreateIndex
CREATE INDEX "processes_created_at_idx" ON "processes"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_retiring_methods_method_code_key" ON "asset_retiring_methods"("method_code");

-- CreateIndex
CREATE INDEX "asset_retiring_methods_method_code_idx" ON "asset_retiring_methods"("method_code");

-- CreateIndex
CREATE INDEX "asset_retiring_methods_method_name_idx" ON "asset_retiring_methods"("method_name");

-- CreateIndex
CREATE INDEX "asset_retiring_methods_method_type_idx" ON "asset_retiring_methods"("method_type");

-- CreateIndex
CREATE INDEX "asset_retiring_methods_is_active_idx" ON "asset_retiring_methods"("is_active");

-- CreateIndex
CREATE INDEX "asset_retiring_methods_created_at_idx" ON "asset_retiring_methods"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "asset_class_descriptions_class_code_key" ON "asset_class_descriptions"("class_code");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_class_code_idx" ON "asset_class_descriptions"("class_code");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_class_name_idx" ON "asset_class_descriptions"("class_name");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_parent_class_id_idx" ON "asset_class_descriptions"("parent_class_id");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_class_level_idx" ON "asset_class_descriptions"("class_level");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_is_active_idx" ON "asset_class_descriptions"("is_active");

-- CreateIndex
CREATE INDEX "asset_class_descriptions_created_at_idx" ON "asset_class_descriptions"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "workstations_workstation_code_key" ON "workstations"("workstation_code");

-- CreateIndex
CREATE INDEX "workstations_workstation_code_idx" ON "workstations"("workstation_code");

-- CreateIndex
CREATE INDEX "workstations_user_id_idx" ON "workstations"("user_id");

-- CreateIndex
CREATE INDEX "workstations_location_id_idx" ON "workstations"("location_id");

-- CreateIndex
CREATE INDEX "workstations_ip_address_idx" ON "workstations"("ip_address");

-- CreateIndex
CREATE INDEX "workstations_is_active_idx" ON "workstations"("is_active");

-- CreateIndex
CREATE INDEX "workstations_created_at_idx" ON "workstations"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "document_groups_group_code_key" ON "document_groups"("group_code");

-- CreateIndex
CREATE INDEX "document_groups_group_code_idx" ON "document_groups"("group_code");

-- CreateIndex
CREATE INDEX "document_groups_group_name_idx" ON "document_groups"("group_name");

-- CreateIndex
CREATE INDEX "document_groups_parent_group_id_idx" ON "document_groups"("parent_group_id");

-- CreateIndex
CREATE INDEX "document_groups_is_active_idx" ON "document_groups"("is_active");

-- CreateIndex
CREATE INDEX "document_groups_created_at_idx" ON "document_groups"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "document_types_type_code_key" ON "document_types"("type_code");

-- CreateIndex
CREATE INDEX "document_types_type_code_idx" ON "document_types"("type_code");

-- CreateIndex
CREATE INDEX "document_types_type_name_idx" ON "document_types"("type_name");

-- CreateIndex
CREATE INDEX "document_types_is_active_idx" ON "document_types"("is_active");

-- CreateIndex
CREATE INDEX "document_types_created_at_idx" ON "document_types"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "documents_document_number_key" ON "documents"("document_number");

-- CreateIndex
CREATE INDEX "documents_document_number_idx" ON "documents"("document_number");

-- CreateIndex
CREATE INDEX "documents_title_idx" ON "documents"("title");

-- CreateIndex
CREATE INDEX "documents_document_type_id_idx" ON "documents"("document_type_id");

-- CreateIndex
CREATE INDEX "documents_document_group_id_idx" ON "documents"("document_group_id");

-- CreateIndex
CREATE INDEX "documents_uploaded_by_idx" ON "documents"("uploaded_by");

-- CreateIndex
CREATE INDEX "documents_status_idx" ON "documents"("status");

-- CreateIndex
CREATE INDEX "documents_related_entity_type_related_entity_id_idx" ON "documents"("related_entity_type", "related_entity_id");

-- CreateIndex
CREATE INDEX "documents_job_request_id_idx" ON "documents"("job_request_id");

-- CreateIndex
CREATE INDEX "documents_asset_id_idx" ON "documents"("asset_id");

-- CreateIndex
CREATE INDEX "documents_assignment_id_idx" ON "documents"("assignment_id");

-- CreateIndex
CREATE INDEX "documents_uploaded_at_idx" ON "documents"("uploaded_at");

-- CreateIndex
CREATE INDEX "documents_created_at_idx" ON "documents"("created_at");

-- CreateIndex
CREATE INDEX "comments_commented_by_idx" ON "comments"("commented_by");

-- CreateIndex
CREATE INDEX "comments_related_entity_type_related_entity_id_idx" ON "comments"("related_entity_type", "related_entity_id");

-- CreateIndex
CREATE INDEX "comments_job_request_id_idx" ON "comments"("job_request_id");

-- CreateIndex
CREATE INDEX "comments_asset_id_idx" ON "comments"("asset_id");

-- CreateIndex
CREATE INDEX "comments_assignment_id_idx" ON "comments"("assignment_id");

-- CreateIndex
CREATE INDEX "comments_parent_comment_id_idx" ON "comments"("parent_comment_id");

-- CreateIndex
CREATE INDEX "comments_commented_at_idx" ON "comments"("commented_at");

-- CreateIndex
CREATE INDEX "comments_created_at_idx" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "language_texts_text_key_idx" ON "language_texts"("text_key");

-- CreateIndex
CREATE INDEX "language_texts_language_code_idx" ON "language_texts"("language_code");

-- CreateIndex
CREATE INDEX "language_texts_context_idx" ON "language_texts"("context");

-- CreateIndex
CREATE INDEX "language_texts_created_at_idx" ON "language_texts"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "language_texts_text_key_language_code_key" ON "language_texts"("text_key", "language_code");

-- CreateIndex
CREATE INDEX "on_behalf_requestor_id_idx" ON "on_behalf"("requestor_id");

-- CreateIndex
CREATE INDEX "on_behalf_delegate_id_idx" ON "on_behalf"("delegate_id");

-- CreateIndex
CREATE INDEX "on_behalf_start_date_idx" ON "on_behalf"("start_date");

-- CreateIndex
CREATE INDEX "on_behalf_end_date_idx" ON "on_behalf"("end_date");

-- CreateIndex
CREATE INDEX "on_behalf_is_active_idx" ON "on_behalf"("is_active");

-- CreateIndex
CREATE INDEX "on_behalf_created_at_idx" ON "on_behalf"("created_at");

-- CreateIndex
CREATE INDEX "on_behalf_logs_on_behalf_id_idx" ON "on_behalf_logs"("on_behalf_id");

-- CreateIndex
CREATE INDEX "on_behalf_logs_performed_by_idx" ON "on_behalf_logs"("performed_by");

-- CreateIndex
CREATE INDEX "on_behalf_logs_action_type_idx" ON "on_behalf_logs"("action_type");

-- CreateIndex
CREATE INDEX "on_behalf_logs_entity_type_entity_id_idx" ON "on_behalf_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "on_behalf_logs_performed_at_idx" ON "on_behalf_logs"("performed_at");

-- CreateIndex
CREATE INDEX "on_behalf_logs_created_at_idx" ON "on_behalf_logs"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_modules_module_name_key" ON "maintenance_modules"("module_name");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_modules_module_code_key" ON "maintenance_modules"("module_code");

-- CreateIndex
CREATE INDEX "maintenance_modules_module_name_idx" ON "maintenance_modules"("module_name");

-- CreateIndex
CREATE INDEX "maintenance_modules_module_code_idx" ON "maintenance_modules"("module_code");

-- CreateIndex
CREATE INDEX "maintenance_modules_is_enabled_idx" ON "maintenance_modules"("is_enabled");

-- CreateIndex
CREATE INDEX "maintenance_modules_created_at_idx" ON "maintenance_modules"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroupMembers_AB_unique" ON "_UserGroupMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroupMembers_B_index" ON "_UserGroupMembers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupAuthorizations_AB_unique" ON "_GroupAuthorizations"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupAuthorizations_B_index" ON "_GroupAuthorizations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserGroupAuthorizations_AB_unique" ON "_UserGroupAuthorizations"("A", "B");

-- CreateIndex
CREATE INDEX "_UserGroupAuthorizations_B_index" ON "_UserGroupAuthorizations"("B");

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_requested_by_fkey" FOREIGN KEY ("requested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_rejected_by_fkey" FOREIGN KEY ("rejected_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_requests" ADD CONSTRAINT "job_requests_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_type_id_fkey" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_status_id_fkey" FOREIGN KEY ("asset_status_id") REFERENCES "asset_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_class_id_fkey" FOREIGN KEY ("asset_class_id") REFERENCES "asset_class_descriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_asset_group_header_id_fkey" FOREIGN KEY ("asset_group_header_id") REFERENCES "asset_group_headers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_responsible_user_id_fkey" FOREIGN KEY ("responsible_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assets" ADD CONSTRAINT "assets_parent_asset_id_fkey" FOREIGN KEY ("parent_asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_job_request_id_fkey" FOREIGN KEY ("job_request_id") REFERENCES "job_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_maintenance_requirement_id_fkey" FOREIGN KEY ("maintenance_requirement_id") REFERENCES "maintenance_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_user_group_id_fkey" FOREIGN KEY ("user_group_id") REFERENCES "user_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_job_request_id_fkey" FOREIGN KEY ("job_request_id") REFERENCES "job_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_requirements" ADD CONSTRAINT "maintenance_requirements_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_duties" ADD CONSTRAINT "maintenance_duties_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_duties" ADD CONSTRAINT "maintenance_duties_maintenance_requirement_id_fkey" FOREIGN KEY ("maintenance_requirement_id") REFERENCES "maintenance_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_duties" ADD CONSTRAINT "maintenance_duties_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "processes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_duties" ADD CONSTRAINT "maintenance_duties_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_duties" ADD CONSTRAINT "maintenance_duties_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_tasks" ADD CONSTRAINT "maintenance_tasks_maintenance_duty_id_fkey" FOREIGN KEY ("maintenance_duty_id") REFERENCES "maintenance_duties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_tasks" ADD CONSTRAINT "maintenance_tasks_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_tasks" ADD CONSTRAINT "maintenance_tasks_completed_by_fkey" FOREIGN KEY ("completed_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_maintenance_duty_id_fkey" FOREIGN KEY ("maintenance_duty_id") REFERENCES "maintenance_duties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_maintenance_duty_id_fkey" FOREIGN KEY ("maintenance_duty_id") REFERENCES "maintenance_duties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_measure_unit_id_fkey" FOREIGN KEY ("measure_unit_id") REFERENCES "measure_units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumed_materials" ADD CONSTRAINT "consumed_materials_consumed_by_fkey" FOREIGN KEY ("consumed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_job_request_id_fkey" FOREIGN KEY ("job_request_id") REFERENCES "job_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_reported_by_fkey" FOREIGN KEY ("reported_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_resolved_by_fkey" FOREIGN KEY ("resolved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_group_headers" ADD CONSTRAINT "asset_group_headers_parent_group_id_fkey" FOREIGN KEY ("parent_group_id") REFERENCES "asset_group_headers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_group_headers" ADD CONSTRAINT "asset_group_headers_responsible_user_id_fkey" FOREIGN KEY ("responsible_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_group_items" ADD CONSTRAINT "asset_group_items_asset_group_header_id_fkey" FOREIGN KEY ("asset_group_header_id") REFERENCES "asset_group_headers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_group_items" ADD CONSTRAINT "asset_group_items_measure_unit_id_fkey" FOREIGN KEY ("measure_unit_id") REFERENCES "measure_units"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_retiring_method_id_fkey" FOREIGN KEY ("retiring_method_id") REFERENCES "asset_retiring_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_initiated_by_fkey" FOREIGN KEY ("initiated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_retirements" ADD CONSTRAINT "asset_retirements_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_changes" ADD CONSTRAINT "cost_center_changes_old_cost_center_id_fkey" FOREIGN KEY ("old_cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_changes" ADD CONSTRAINT "cost_center_changes_new_cost_center_id_fkey" FOREIGN KEY ("new_cost_center_id") REFERENCES "cost_centers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_changes" ADD CONSTRAINT "cost_center_changes_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_changes" ADD CONSTRAINT "cost_center_changes_approved_by_fkey" FOREIGN KEY ("approved_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_primary_department_id_fkey" FOREIGN KEY ("primary_department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_parent_department_id_fkey" FOREIGN KEY ("parent_department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_department_assignments" ADD CONSTRAINT "user_department_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_department_assignments" ADD CONSTRAINT "user_department_assignments_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_centers" ADD CONSTRAINT "cost_centers_parent_cost_center_id_fkey" FOREIGN KEY ("parent_cost_center_id") REFERENCES "cost_centers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_responsibles" ADD CONSTRAINT "cost_center_responsibles_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_centers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_responsibles" ADD CONSTRAINT "cost_center_responsibles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_center_responsibles" ADD CONSTRAINT "cost_center_responsibles_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_parent_group_id_fkey" FOREIGN KEY ("parent_group_id") REFERENCES "user_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authorizations" ADD CONSTRAINT "authorizations_parent_authorization_id_fkey" FOREIGN KEY ("parent_authorization_id") REFERENCES "authorizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_location_id_fkey" FOREIGN KEY ("parent_location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_types" ADD CONSTRAINT "asset_types_parent_type_id_fkey" FOREIGN KEY ("parent_type_id") REFERENCES "asset_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_parent_process_id_fkey" FOREIGN KEY ("parent_process_id") REFERENCES "processes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset_class_descriptions" ADD CONSTRAINT "asset_class_descriptions_parent_class_id_fkey" FOREIGN KEY ("parent_class_id") REFERENCES "asset_class_descriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workstations" ADD CONSTRAINT "workstations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_groups" ADD CONSTRAINT "document_groups_parent_group_id_fkey" FOREIGN KEY ("parent_group_id") REFERENCES "document_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "document_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_document_group_id_fkey" FOREIGN KEY ("document_group_id") REFERENCES "document_groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_job_request_id_fkey" FOREIGN KEY ("job_request_id") REFERENCES "job_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_maintenance_requirement_id_fkey" FOREIGN KEY ("maintenance_requirement_id") REFERENCES "maintenance_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_maintenance_duty_id_fkey" FOREIGN KEY ("maintenance_duty_id") REFERENCES "maintenance_duties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_asset_retirement_id_fkey" FOREIGN KEY ("asset_retirement_id") REFERENCES "asset_retirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_commented_by_fkey" FOREIGN KEY ("commented_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_job_request_id_fkey" FOREIGN KEY ("job_request_id") REFERENCES "job_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "assignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_maintenance_requirement_id_fkey" FOREIGN KEY ("maintenance_requirement_id") REFERENCES "maintenance_requirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_maintenance_duty_id_fkey" FOREIGN KEY ("maintenance_duty_id") REFERENCES "maintenance_duties"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_maintenance_task_id_fkey" FOREIGN KEY ("maintenance_task_id") REFERENCES "maintenance_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_incident_id_fkey" FOREIGN KEY ("incident_id") REFERENCES "incidents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_asset_retirement_id_fkey" FOREIGN KEY ("asset_retirement_id") REFERENCES "asset_retirements"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "on_behalf" ADD CONSTRAINT "on_behalf_requestor_id_fkey" FOREIGN KEY ("requestor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "on_behalf" ADD CONSTRAINT "on_behalf_delegate_id_fkey" FOREIGN KEY ("delegate_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "on_behalf_logs" ADD CONSTRAINT "on_behalf_logs_on_behalf_id_fkey" FOREIGN KEY ("on_behalf_id") REFERENCES "on_behalf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "on_behalf_logs" ADD CONSTRAINT "on_behalf_logs_performed_by_fkey" FOREIGN KEY ("performed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupMembers" ADD CONSTRAINT "_UserGroupMembers_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupMembers" ADD CONSTRAINT "_UserGroupMembers_B_fkey" FOREIGN KEY ("B") REFERENCES "user_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupAuthorizations" ADD CONSTRAINT "_GroupAuthorizations_A_fkey" FOREIGN KEY ("A") REFERENCES "authorizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupAuthorizations" ADD CONSTRAINT "_GroupAuthorizations_B_fkey" FOREIGN KEY ("B") REFERENCES "authorization_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupAuthorizations" ADD CONSTRAINT "_UserGroupAuthorizations_A_fkey" FOREIGN KEY ("A") REFERENCES "authorization_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserGroupAuthorizations" ADD CONSTRAINT "_UserGroupAuthorizations_B_fkey" FOREIGN KEY ("B") REFERENCES "user_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
