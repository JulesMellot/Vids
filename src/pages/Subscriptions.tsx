import { useState } from 'react'
import { FolderSimple, Plus, Upload } from '@phosphor-icons/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../services/db'
import { ImportModal } from '../components/subscriptions/ImportModal/ImportModal'
import { CreateFolderModal } from '../components/subscriptions/CreateFolderModal/CreateFolderModal'
import { FolderTree } from '../components/subscriptions/FolderTree/FolderTree'
import { useFolders } from '../hooks/useFolders'
import './pages.css'

export function Subscriptions() {
    const [isImportModalOpen, setIsImportModalOpen] = useState(false)
    const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false)
    const subscriptions = useLiveQuery(() => db.subscriptions.toArray())
    const { folders, createFolder } = useFolders()

    const handleImportSuccess = () => {
        console.log('Import successful')
    }

    const handleCreateFolder = (name: string) => {
        createFolder(name)
    }

    return (
        <div className="page subscriptions-page">
            <header className="page__header flex-between">
                <div>
                    <h1 className="page__title">Abonnements</h1>
                    <p className="page__description">Gérez vos {subscriptions?.length || 0} chaînes et dossiers</p>
                </div>
                <div className="page__actions">
                    <button className="btn btn--secondary" onClick={() => setIsImportModalOpen(true)}>
                        <Upload size={20} />
                        <span>Importer</span>
                    </button>
                    <button className="btn btn--primary" onClick={() => setIsCreateFolderModalOpen(true)}>
                        <Plus size={20} />
                        <span>Nouveau dossier</span>
                    </button>
                </div>
            </header>

            {subscriptions && subscriptions.length > 0 ? (
                <div className="subscriptions-content-grid">
                    <FolderTree
                        onSelectChannel={(id) => console.log('Selected channel', id)}
                        onSelectFolder={(id) => console.log('Selected folder', id)}
                    />
                    <div className="subscriptions-main">
                        {/* Selected channel or folder content would go here */}
                        <div className="page__placeholder">
                            <p className="page__placeholder-text">Sélectionnez une chaîne ou un dossier</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="page__placeholder">
                    <FolderSimple size={64} weight="thin" className="page__placeholder-icon" />
                    <p className="page__placeholder-text">Aucun abonnement</p>
                    <p className="page__placeholder-subtext">
                        Importez vos abonnements YouTube depuis Google Takeout pour commencer.
                    </p>
                    <button className="btn btn--primary" style={{ marginTop: '20px' }} onClick={() => setIsImportModalOpen(true)}>
                        Importer maintenant
                    </button>
                </div>
            )}

            {isImportModalOpen && (
                <ImportModal
                    onClose={() => setIsImportModalOpen(false)}
                    onSuccess={handleImportSuccess}
                />
            )}

            {isCreateFolderModalOpen && (
                <CreateFolderModal
                    onClose={() => setIsCreateFolderModalOpen(false)}
                    onSave={handleCreateFolder}
                />
            )}
        </div>
    )
}

export default Subscriptions
