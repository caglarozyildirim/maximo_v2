import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  IconButton,
} from '@mui/material';
import { Send as SendIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Comment {
  id: number;
  content: string;
  createdBy: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (content: string) => Promise<void>;
  onDeleteComment?: (id: number) => Promise<void>;
  currentUserId?: number;
}

export default function Comments({ comments, onAddComment, onDeleteComment, currentUserId }: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await onAddComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!onDeleteComment) return;
    if (!window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

    try {
      await onDeleteComment(id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Box>
      {/* Add Comment */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Yorum ekle..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSubmit}
            disabled={!newComment.trim() || submitting}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {submitting ? 'Gönderiliyor...' : 'Yorum Ekle'}
          </Button>
        </Box>
      </Paper>

      {/* Comments List */}
      {comments.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Henüz yorum yok. İlk yorumu siz yapın!
          </Typography>
        </Box>
      ) : (
        <Box>
          {comments.map((comment, index) => (
            <Box key={comment.id}>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#667eea',
                      width: 40,
                      height: 40,
                    }}
                  >
                    {getInitials(comment.createdBy.firstName, comment.createdBy.lastName)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                      <Box>
                        <Typography variant="body1" fontWeight={600}>
                          {comment.createdBy.firstName} {comment.createdBy.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.createdAt).toLocaleString('tr-TR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </Typography>
                      </Box>
                      {onDeleteComment && (
                        <IconButton size="small" color="error" onClick={() => handleDelete(comment.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
