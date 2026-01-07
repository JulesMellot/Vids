import React, { useState } from 'react';
import { X } from '@phosphor-icons/react';
import './CreateFolderModal.css';

interface CreateFolderModalProps {
    onClose: () => void;
    onSave: (name: string) => void;
}

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSave(name.trim());
            onClose();
        }
    };

    return (
        <div className="vids-modal-overlay">
            <div className="vids-modal-content small">
                <div className="vids-modal-header">
                    <h2>Nouveau dossier</h2>
                    <button className="vids-modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form className="vids-modal-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="folderName">Nom du dossier</label>
                        <input
                            id="folderName"
                            type="text"
                            autoFocus
                            placeholder="Ex: Musique, Tech, Gaming..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="vids-input"
                        />
                    </div>
                    <div className="vids-modal-footer">
                        <button type="button" className="btn btn--secondary" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="btn btn--primary" disabled={!name.trim()}>
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateFolderModal;
