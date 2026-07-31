import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'

export const ConfirmModal = ({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="space-y-6">
        <p className="text-slate-600">{message}</p>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} fullWidth>
            {cancelText}
          </Button>
          <Button
            variant={isDangerous ? 'danger' : 'primary'}
            onClick={onConfirm}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
