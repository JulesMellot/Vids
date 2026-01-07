import React, { useState } from 'react';
import { Upload, X } from '@phosphor-icons/react';
import { parseSubscriptionsCSV } from '../CSVParser/csvParser';
import { db } from '../../../services/db';
import './ImportModal.css';

interface ImportModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const text = event.target?.result as string;
                const rawSubs = parseSubscriptionsCSV(text);

                if (rawSubs.length === 0) {
                    throw new Error("Le fichier CSV est vide ou mal formaté.");
                }

                // Add to IndexedDB
                const subsToSave = rawSubs.map(sub => ({
                    channelId: sub.channelId,
                    channelName: sub.channelTitle,
                    channelAvatar: '', // Will be updated later via API if needed
                    folderId: null,
                    playbackSpeed: 1,
                    filters: {
                        minDuration: null,
                        maxDuration: null,
                        excludeKeywords: [],
                        includeKeywords: [],
                        excludeShorts: false,
                        excludeLives: false
                    },
                    subscribedAt: new Date(),
                    updatedAt: new Date(),
                    syncStatus: 'pending' as const
                }));

                // Bulk put in DB (ignoring errors for existing subs)
                await db.subscriptions.bulkPut(subsToSave);

                onSuccess();
                onClose();
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            setError("Erreur lors de la lecture du fichier.");
            setLoading(false);
        };

        reader.readAsText(file);
    };

    return (
        <div className="vids-modal-overlay">
            <div className="vids-modal-content">
                <div className="vids-modal-header">
                    <h2>Importer des abonnements</h2>
                    <button className="vids-modal-close" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="vids-modal-body">
                    <p>
                        Importez vos abonnements YouTube depuis un fichier CSV (Google Takeout).
                    </p>

                    <label className={`vids-import-dropzone ${loading ? 'loading' : ''}`}>
                        <Upload size={48} weight="thin" />
                        <span>{loading ? 'Traitement...' : 'Cliquez pour sélectionner un fichier CSV'}</span>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            disabled={loading}
                        />
                    </label>

                    {error && <p className="vids-import-error">{error}</p>}

                    <div className="vids-import-help">
                        <h3>Comment obtenir mon fichier CSV ?</h3>
                        <ol>
                            <li>Allez sur <a href="https://takeout.google.com" target="_blank" rel="noreferrer">Google Takeout</a></li>
                            <li>Désélectionnez tout et cochez uniquement <strong>YouTube</strong></li>
                            <li>Cliquez sur "Toutes les données YouTube incluses" et ne gardez que <strong>subscriptions</strong></li>
                            <li>Générez l'export et téléchargez le fichier CSV</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
