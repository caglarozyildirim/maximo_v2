# Incident Form (Arıza Bildirimi) - TypeScript Implementation Guide

## Overview
This guide provides TypeScript-specific interfaces, types, and implementation recommendations for completely rewriting the IncidentForm.tsx component.

## Type Definitions

### Core Incident Interface

```typescript
interface Incident {
  // Identifiers
  incidentId: string;
  status: IncidentStatus;
  currentStage: WorkflowStage;
  
  // Basic Information
  title: string;
  description: string;
  
  // Asset Information (at least one required)
  sapAsset?: {
    number: string;
    title: string; // Auto-populated from SAP
  };
  maintenanceAsset?: {
    number: string;
    title: string; // Auto-populated from DB
  };
  
  // Location Information (required)
  location: {
    locationId: string;
    locationName: string;
    subUnit?: {
      subUnitId: string;
      subUnitName: string;
    };
  };
  
  // Creator Information (auto-filled)
  creator: UserInfo & {
    createdAt: Date;
  };
  
  // Current Assignee (system-managed)
  currentAssignee?: UserInfo;
  
  // Alternative User (optional)
  alternativeUserToReceive?: UserInfo;
  
  // Stage-specific data
  maintenanceResponsible?: MaintenanceResponsibleInfo;
  solutionResponsible?: SolutionResponsibleInfo;
  outsourceService?: OutsourceServiceInfo;
  delayInfo?: DelayInfo;
  solutionInfo?: SolutionInfo;
  consumedMaterials?: MaterialConsumption[];
  
  // Approvals
  approvals: ApprovalInfo[];
  
  // Rejection (if applicable)
  rejection?: RejectionInfo;
  
  // Documents and Comments
  documents: DocumentAttachment[];
  comments: Comment[];
}
```

### Workflow and Status Types

```typescript
enum IncidentStatus {
  DRAFT = 'Draft',
  WAITING = 'Waiting',
  ASSIGNED_TO_MAINTENANCE = 'Assigned to Maintenance',
  SOLUTION_IN_PROGRESS = 'Solution in Progress',
  SENT_TO_OUTSOURCE = 'Sent to Outsource',
  DELAYED = 'Delayed',
  SOLUTION_PROVIDED = 'Solution Provided',
  PENDING_SL_TL_APPROVAL = 'Pending SL-TL Approval',
  PENDING_REQUESTOR_APPROVAL = 'Pending Requestor Approval',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  CLOSED = 'Closed'
}

enum WorkflowStage {
  CREATE_INCIDENT = 'a. Create incident',
  HAND_OVER_TO_MAINTENANCE = 'a. Handing over the asset to a maintenance responsible',
  ASSIGN_SOLUTION_RESPONSIBLE = 'b. Assignment to a solution responsible by one of SL-TL group',
  SEND_TO_OUTSOURCE = 'c. Sending asset to an outsource service',
  ENTER_DELAY_REASON = 'd. Enter delay reason',
  SOLUTION_ENTERED = 'e. Solution explanation entered',
  MATERIALS_ENTERED = 'f. Consumed materials and quantities entered',
  MANUAL_APPROVAL = 'i. Manual approval',
  FAST_TRACK_APPROVAL = 'ii. manual approval without solution approval from SL & TL',
  REJECTION = 'iii. Rejection',
  FINAL_APPROVAL = 'j. Solution approval from creator first manager or alternative approver'
}

enum ApprovalType {
  SL_TL_APPROVAL = 'SL - TL Approval',
  REQUESTOR_APPROVAL = 'Requestor Approval'
}

enum UserRole {
  INCIDENT_CREATOR = 'Incident Creator',
  MAINTENANCE_RESPONSIBLE = 'Maintenance Responsible',
  SL_TL = 'SL-TL',
  SOLUTION_RESPONSIBLE = 'Solution Responsible',
  MANAGER = 'Manager'
}
```

### Supporting Interfaces

```typescript
interface UserInfo {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  department: string;
}

interface MaintenanceResponsibleInfo {
  receivedBy: UserInfo;
  receivedAt: Date;
}

interface SolutionResponsibleInfo {
  responsibleUser: UserInfo;
  assignedAt: Date;
  assignedBy: UserInfo;
}

interface OutsourceServiceInfo {
  serviceName: string;
  explanation: string;
  sentBy: UserInfo;
  sentAt: Date;
}

interface DelayInfo {
  reason: string;
  declaredBy: UserInfo;
  declaredAt: Date;
}

interface SolutionInfo {
  explanation: string;
  solutionProvided: boolean;
  providedBy: UserInfo;
  providedAt: Date;
}

interface MaterialConsumption {
  itemNumber: number;
  processType: string;
  processId: string;
  material: {
    materialId: string;
    materialName: string;
  };
  quantity: number;
  unitOfMeasure: string;
}

interface ApprovalInfo {
  approvalType: ApprovalType;
  approver: UserInfo;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy?: UserInfo;
  approvedAt?: Date;
}

interface RejectionInfo {
  reason: string;
  rejectedBy: UserInfo;
  rejectedAt: Date;
  rejectedApprovalType: ApprovalType;
}

interface DocumentAttachment {
  documentGroupId: string;
  documentId: string;
  title: string;
  description: string;
  link: string;
  uploadedBy: UserInfo;
  uploadedAt: Date;
}

interface Comment {
  commentId: string;
  text: string;
  author: UserInfo;
  createdAt: Date;
}
```

### Form Props and State

```typescript
interface IncidentFormProps {
  mode: 'create' | 'edit' | 'view';
  incidentId?: string; // For edit/view modes
  currentUserRole: UserRole;
  currentUser: UserInfo;
  onSave: (incident: Incident) => Promise<void>;
  onSubmit: (incident: Incident) => Promise<void>;
  onApprove?: (incidentId: string, comments?: string) => Promise<void>;
  onReject?: (incidentId: string, reason: string) => Promise<void>;
  onClose: () => void;
}

interface IncidentFormState {
  incident: Incident;
  loading: boolean;
  errors: ValidationErrors;
  isDirty: boolean;
  activeSection: string;
}

interface ValidationErrors {
  [fieldName: string]: string;
}
```

## Component Structure

### Recommended File Structure

```
components/
  incident/
    IncidentForm.tsx                  # Main form container
    sections/
      BasicInformationSection.tsx     # Title, description
      AssetSelectionSection.tsx       # SAP/Maintenance asset
      LocationSection.tsx             # Location hierarchy
      CreatorInfoSection.tsx          # Creator details (read-only)
      MaintenanceSection.tsx          # Maintenance responsible
      SolutionResponsibleSection.tsx  # SL-TL assignment
      OutsourceServiceSection.tsx     # Outsource details
      DelayInfoSection.tsx            # Delay reason
      SolutionSection.tsx             # Solution details
      MaterialsSection.tsx            # Materials table
      ApprovalsSection.tsx            # Approval timeline
      RejectionSection.tsx            # Rejection details
      DocumentsSection.tsx            # Document list
      CommentsSection.tsx             # Comment thread
    hooks/
      useIncidentForm.ts              # Form state management
      useIncidentValidation.ts        # Validation logic
      useIncidentWorkflow.ts          # Workflow logic
      useIncidentPermissions.ts       # Permission checks
    types/
      incident.types.ts               # All TypeScript interfaces
    utils/
      incidentValidators.ts           # Validation functions
      incidentHelpers.ts              # Helper functions
```

### Main Form Component Structure

```typescript
export const IncidentForm: React.FC<IncidentFormProps> = ({
  mode,
  incidentId,
  currentUserRole,
  currentUser,
  onSave,
  onSubmit,
  onApprove,
  onReject,
  onClose
}) => {
  // Custom hooks
  const {
    incident,
    loading,
    errors,
    isDirty,
    updateField,
    saveIncident,
    submitIncident
  } = useIncidentForm(mode, incidentId, currentUser);
  
  const { canEdit, canApprove, canReject, visibleSections } = 
    useIncidentPermissions(incident, currentUserRole);
  
  const { validateField, validateForm } = useIncidentValidation();
  
  const { getAvailableActions, performAction } = useIncidentWorkflow(incident);

  // Render logic with conditional sections
  return (
    <Form>
      <BasicInformationSection 
        incident={incident}
        onChange={updateField}
        errors={errors}
        readOnly={!canEdit('basic')}
      />
      
      <AssetSelectionSection 
        incident={incident}
        onChange={updateField}
        errors={errors}
        readOnly={!canEdit('asset')}
      />
      
      {/* More sections with conditional rendering */}
      
      {visibleSections.includes('approvals') && (
        <ApprovalsSection 
          approvals={incident.approvals}
          canApprove={canApprove}
          canReject={canReject}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
      
      <ActionButtons 
        mode={mode}
        availableActions={getAvailableActions()}
        onSave={saveIncident}
        onSubmit={submitIncident}
        onClose={onClose}
      />
    </Form>
  );
};
```

## Validation Rules

### Field-Level Validation

```typescript
export const incidentValidators = {
  title: (value: string): string | null => {
    if (!value || value.trim().length === 0) {
      return 'Incident title is required';
    }
    if (value.length > 128) {
      return 'Title cannot exceed 128 characters';
    }
    return null;
  },
  
  description: (value: string): string | null => {
    if (!value || value.trim().length === 0) {
      return 'Incident description is required';
    }
    if (value.length > 400) {
      return 'Description cannot exceed 400 characters';
    }
    return null;
  },
  
  asset: (incident: Incident): string | null => {
    if (!incident.sapAsset && !incident.maintenanceAsset) {
      return 'Either SAP Asset or Maintenance Asset must be selected';
    }
    return null;
  },
  
  location: (location: Incident['location']): string | null => {
    if (!location?.locationId) {
      return 'Location is required';
    }
    return null;
  },
  
  solutionExplanation: (value: string): string | null => {
    if (!value || value.trim().length === 0) {
      return 'Solution explanation is required before approval';
    }
    return null;
  },
  
  rejectionReason: (value: string): string | null => {
    if (!value || value.trim().length === 0) {
      return 'Rejection reason is required';
    }
    return null;
  },
  
  materialQuantity: (value: number): string | null => {
    if (value <= 0) {
      return 'Quantity must be greater than zero';
    }
    return null;
  }
};
```

### Form-Level Validation

```typescript
export const validateIncidentForm = (
  incident: Incident,
  stage: WorkflowStage
): ValidationErrors => {
  const errors: ValidationErrors = {};
  
  // Basic validation for all stages
  const titleError = incidentValidators.title(incident.title);
  if (titleError) errors.title = titleError;
  
  const descError = incidentValidators.description(incident.description);
  if (descError) errors.description = descError;
  
  const assetError = incidentValidators.asset(incident);
  if (assetError) errors.asset = assetError;
  
  const locationError = incidentValidators.location(incident.location);
  if (locationError) errors.location = locationError;
  
  // Stage-specific validation
  switch (stage) {
    case WorkflowStage.HAND_OVER_TO_MAINTENANCE:
      if (!incident.maintenanceResponsible?.receivedBy) {
        errors.maintenanceResponsible = 'Maintenance responsible must be specified';
      }
      break;
      
    case WorkflowStage.ASSIGN_SOLUTION_RESPONSIBLE:
      if (!incident.solutionResponsible?.responsibleUser) {
        errors.solutionResponsible = 'Solution responsible must be assigned';
      }
      break;
      
    case WorkflowStage.SEND_TO_OUTSOURCE:
      if (incident.outsourceService) {
        if (!incident.outsourceService.explanation) {
          errors.outsourceExplanation = 'Outsource explanation is required';
        }
      }
      break;
      
    case WorkflowStage.SOLUTION_ENTERED:
      const solutionError = incidentValidators.solutionExplanation(
        incident.solutionInfo?.explanation || ''
      );
      if (solutionError) errors.solutionExplanation = solutionError;
      break;
      
    case WorkflowStage.MATERIALS_ENTERED:
      incident.consumedMaterials?.forEach((material, index) => {
        const qtyError = incidentValidators.materialQuantity(material.quantity);
        if (qtyError) {
          errors[`material_${index}_quantity`] = qtyError;
        }
      });
      break;
  }
  
  return errors;
};
```

## Permission Logic

```typescript
export const useIncidentPermissions = (
  incident: Incident,
  currentUserRole: UserRole
) => {
  const canEdit = (section: string): boolean => {
    // Creator can edit basic info in CREATE stage only
    if (section === 'basic' && incident.currentStage === WorkflowStage.CREATE_INCIDENT) {
      return currentUserRole === UserRole.INCIDENT_CREATOR;
    }
    
    // Maintenance responsible can hand over asset
    if (section === 'maintenance' && 
        incident.currentStage === WorkflowStage.HAND_OVER_TO_MAINTENANCE) {
      return currentUserRole === UserRole.MAINTENANCE_RESPONSIBLE;
    }
    
    // SL-TL can assign solution responsible
    if (section === 'solutionResponsible' && 
        incident.currentStage === WorkflowStage.ASSIGN_SOLUTION_RESPONSIBLE) {
      return currentUserRole === UserRole.SL_TL;
    }
    
    // Solution responsible can provide solution and materials
    if ((section === 'solution' || section === 'materials') && 
        (incident.currentStage === WorkflowStage.SOLUTION_ENTERED ||
         incident.currentStage === WorkflowStage.MATERIALS_ENTERED)) {
      return currentUserRole === UserRole.SOLUTION_RESPONSIBLE;
    }
    
    // Comments can be added by anyone involved
    if (section === 'comments') {
      return true;
    }
    
    return false;
  };
  
  const canApprove = (): boolean => {
    if (incident.status === IncidentStatus.PENDING_SL_TL_APPROVAL) {
      return currentUserRole === UserRole.SL_TL;
    }
    if (incident.status === IncidentStatus.PENDING_REQUESTOR_APPROVAL) {
      return currentUserRole === UserRole.MANAGER;
    }
    return false;
  };
  
  const canReject = (): boolean => {
    return canApprove(); // Same roles that can approve can reject
  };
  
  const visibleSections = (): string[] => {
    const sections = ['basic', 'asset', 'location', 'creator'];
    
    if (incident.currentStage >= WorkflowStage.HAND_OVER_TO_MAINTENANCE) {
      sections.push('maintenance');
    }
    if (incident.currentStage >= WorkflowStage.ASSIGN_SOLUTION_RESPONSIBLE) {
      sections.push('solutionResponsible');
    }
    if (incident.outsourceService) {
      sections.push('outsource');
    }
    if (incident.delayInfo) {
      sections.push('delay');
    }
    if (incident.currentStage >= WorkflowStage.SOLUTION_ENTERED) {
      sections.push('solution');
    }
    if (incident.consumedMaterials && incident.consumedMaterials.length > 0) {
      sections.push('materials');
    }
    if (incident.currentStage >= WorkflowStage.MANUAL_APPROVAL) {
      sections.push('approvals');
    }
    if (incident.status === IncidentStatus.REJECTED) {
      sections.push('rejection');
    }
    
    sections.push('documents', 'comments');
    
    return sections;
  };
  
  return {
    canEdit,
    canApprove,
    canReject,
    visibleSections: visibleSections()
  };
};
```

## API Integration

```typescript
// API Service
export const incidentApi = {
  // Get incident by ID
  getIncident: async (incidentId: string): Promise<Incident> => {
    const response = await fetch(`/api/incidents/${incidentId}`);
    return response.json();
  },
  
  // Create new incident
  createIncident: async (incident: Partial<Incident>): Promise<Incident> => {
    const response = await fetch('/api/incidents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incident)
    });
    return response.json();
  },
  
  // Update incident
  updateIncident: async (incidentId: string, incident: Partial<Incident>): Promise<Incident> => {
    const response = await fetch(`/api/incidents/${incidentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incident)
    });
    return response.json();
  },
  
  // Submit incident for processing
  submitIncident: async (incidentId: string): Promise<void> => {
    await fetch(`/api/incidents/${incidentId}/submit`, {
      method: 'POST'
    });
  },
  
  // Approve incident
  approveIncident: async (incidentId: string, approvalType: ApprovalType, comments?: string): Promise<void> => {
    await fetch(`/api/incidents/${incidentId}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvalType, comments })
    });
  },
  
  // Reject incident
  rejectIncident: async (incidentId: string, approvalType: ApprovalType, reason: string): Promise<void> => {
    await fetch(`/api/incidents/${incidentId}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvalType, reason })
    });
  },
  
  // Add comment
  addComment: async (incidentId: string, text: string): Promise<Comment> => {
    const response = await fetch(`/api/incidents/${incidentId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return response.json();
  },
  
  // Upload document
  uploadDocument: async (incidentId: string, file: File, metadata: Partial<DocumentAttachment>): Promise<DocumentAttachment> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    
    const response = await fetch(`/api/incidents/${incidentId}/documents`, {
      method: 'POST',
      body: formData
    });
    return response.json();
  },
  
  // Lookup APIs
  searchSAPAssets: async (query: string): Promise<Array<{number: string, title: string}>> => {
    const response = await fetch(`/api/assets/sap/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },
  
  searchMaintenanceAssets: async (query: string): Promise<Array<{number: string, title: string}>> => {
    const response = await fetch(`/api/assets/maintenance/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },
  
  searchUsers: async (query: string): Promise<UserInfo[]> => {
    const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`);
    return response.json();
  },
  
  getLocations: async (): Promise<Array<{id: string, name: string}>> => {
    const response = await fetch('/api/locations');
    return response.json();
  },
  
  getLocationSubUnits: async (locationId: string): Promise<Array<{id: string, name: string}>> => {
    const response = await fetch(`/api/locations/${locationId}/subunits`);
    return response.json();
  },
  
  searchMaterials: async (query: string): Promise<Array<{id: string, name: string, uom: string}>> => {
    const response = await fetch(`/api/materials/search?q=${encodeURIComponent(query)}`);
    return response.json();
  }
};
```

## Usage Example

```typescript
// Example usage in a parent component
const IncidentManagementPage: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>();
  const currentUser = useCurrentUser();
  const currentUserRole = useCurrentUserRole();
  
  const handleSave = async (incident: Incident) => {
    await incidentApi.updateIncident(incident.incidentId, incident);
    toast.success('Incident saved successfully');
  };
  
  const handleSubmit = async (incident: Incident) => {
    await incidentApi.submitIncident(incident.incidentId);
    toast.success('Incident submitted successfully');
    setIsFormOpen(false);
  };
  
  const handleApprove = async (incidentId: string, comments?: string) => {
    // Determine which approval type based on current status
    const incident = await incidentApi.getIncident(incidentId);
    const approvalType = incident.status === IncidentStatus.PENDING_SL_TL_APPROVAL
      ? ApprovalType.SL_TL_APPROVAL
      : ApprovalType.REQUESTOR_APPROVAL;
    
    await incidentApi.approveIncident(incidentId, approvalType, comments);
    toast.success('Incident approved');
    setIsFormOpen(false);
  };
  
  const handleReject = async (incidentId: string, reason: string) => {
    const incident = await incidentApi.getIncident(incidentId);
    const approvalType = incident.status === IncidentStatus.PENDING_SL_TL_APPROVAL
      ? ApprovalType.SL_TL_APPROVAL
      : ApprovalType.REQUESTOR_APPROVAL;
    
    await incidentApi.rejectIncident(incidentId, approvalType, reason);
    toast.warning('Incident rejected');
    setIsFormOpen(false);
  };
  
  return (
    <>
      <Button onClick={() => setIsFormOpen(true)}>Create Incident</Button>
      
      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <IncidentForm
            mode={selectedIncidentId ? 'edit' : 'create'}
            incidentId={selectedIncidentId}
            currentUser={currentUser}
            currentUserRole={currentUserRole}
            onSave={handleSave}
            onSubmit={handleSubmit}
            onApprove={handleApprove}
            onReject={handleReject}
            onClose={() => setIsFormOpen(false)}
          />
        </Modal>
      )}
    </>
  );
};
```

## Key Implementation Notes

1. **Field Visibility**: Implement conditional rendering based on workflow stage
2. **Read-Only Fields**: Many fields auto-populate (SAP titles, user info, timestamps)
3. **Validation**: Client-side validation before API calls, server-side validation for security
4. **Permissions**: Role-based access control for each section
5. **Workflow State Machine**: Implement clear state transitions
6. **Audit Trail**: All user actions automatically timestamped
7. **Optimistic Updates**: Show immediate feedback, rollback on error
8. **Auto-save**: Consider auto-saving drafts periodically
9. **Error Handling**: Clear error messages for validation and API failures
10. **Accessibility**: Ensure form is keyboard navigable and screen reader friendly

## Testing Considerations

- Unit tests for validation functions
- Integration tests for API calls
- E2E tests for complete workflows
- Permission tests for each role
- Edge case testing (empty states, error states)
- Approval/rejection flow testing
- Multi-user concurrent editing scenarios
