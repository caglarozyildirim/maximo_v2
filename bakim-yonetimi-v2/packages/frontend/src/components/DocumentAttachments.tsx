import { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface Document {
  id: number;
  filename: string;
  fileSize: number;
  fileType: string;
  uploadedBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

interface DocumentAttachmentsProps {
  documents: Document[];
  onUpload: (file: File) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  onDownload?: (id: number, filename: string) => void;
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
}

export default function DocumentAttachments({
  documents,
  onUpload,
  onDelete,
  onDownload,
  maxFileSize = 10,
  allowedFileTypes = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.png', '.jpg', '.jpeg'],
}: DocumentAttachmentsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <PdfIcon sx={{ color: '#ef4444' }} />;
    if (fileType.includes('image')) return <ImageIcon sx={{ color: '#3b82f6' }} />;
    if (fileType.includes('word') || fileType.includes('document')) return <DocIcon sx={{ color: '#2563eb' }} />;
    if (fileType.includes('sheet') || fileType.includes('excel')) return <FileIcon sx={{ color: '#10b981' }} />;
    return <FileIcon />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`Dosya boyutu ${maxFileSize}MB'den büyük olamaz`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      alert(`Sadece şu dosya türleri kabul edilir: ${allowedFileTypes.join(', ')}`);
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 100);

      await onUpload(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Reset after a brief delay
      setTimeout(() => {
        setUploadProgress(0);
        setUploading(false);
      }, 500);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(0);
      setUploading(false);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (id: number) => {
    if (!onDelete) return;
    if (!window.confirm('Bu dökümanı silmek istediğinizden emin misiniz?')) return;

    try {
      await onDelete(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Box>
      {/* Upload Section */}
      <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedFileTypes.join(',')}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleFileSelect}
          disabled={uploading}
          sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          {uploading ? 'Yükleniyor...' : 'Döküman Ekle'}
        </Button>
        <Typography variant="caption" display="block" sx={{ mt: 1 }} color="text.secondary">
          Maksimum dosya boyutu: {maxFileSize}MB
        </Typography>
        {uploading && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
      </Paper>

      {/* Documents List */}
      {documents.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Henüz döküman eklenmemiş
          </Typography>
        </Box>
      ) : (
        <List>
          {documents.map((doc) => (
            <Paper key={doc.id} sx={{ mb: 1 }}>
              <ListItem>
                <ListItemIcon>{getFileIcon(doc.fileType)}</ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{doc.filename}</Typography>
                      <Chip label={formatFileSize(doc.fileSize)} size="small" />
                    </Box>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {doc.uploadedBy.firstName} {doc.uploadedBy.lastName} •{' '}
                      {new Date(doc.createdAt).toLocaleDateString('tr-TR')}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  {onDownload && (
                    <IconButton
                      edge="end"
                      onClick={() => onDownload(doc.id, doc.filename)}
                      sx={{ mr: 1 }}
                    >
                      <DownloadIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton edge="end" color="error" onClick={() => handleDelete(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
