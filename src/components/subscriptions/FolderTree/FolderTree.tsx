import React, { useState } from 'react';
import { CaretDown, CaretRight, Folder, Hash } from '@phosphor-icons/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../services/db';
import './FolderTree.css';

interface FolderTreeProps {
    onSelectChannel: (channelId: string) => void;
    onSelectFolder: (folderId: string | null) => void;
}

export const FolderTree: React.FC<FolderTreeProps> = ({ onSelectChannel, onSelectFolder }) => {
    const folders = useLiveQuery(() => db.folders.toArray());
    const subscriptions = useLiveQuery(() => db.subscriptions.toArray());
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newExpanded = new Set(expandedFolders);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedFolders(newExpanded);
    };

    const getFolderSubs = (folderId: string | null) => {
        return subscriptions?.filter(sub => sub.folderId === folderId) || [];
    };

    return (
        <div className="vids-folder-tree">
            <div
                className="vids-folder-tree__item root"
                onClick={() => onSelectFolder(null)}
            >
                <Folder size={18} weight="regular" />
                <span>Toutes les chaînes</span>
            </div>

            {folders?.map(folder => {
                const isOpen = expandedFolders.has(folder.id);
                const subs = getFolderSubs(folder.id);

                return (
                    <div key={folder.id} className="vids-folder-tree__group">
                        <div
                            className={`vids-folder-tree__item folder ${isOpen ? 'open' : ''}`}
                            onClick={() => onSelectFolder(folder.id)}
                        >
                            <button
                                className="vids-folder-tree__toggle"
                                onClick={(e) => toggleFolder(folder.id, e)}
                            >
                                {isOpen ? <CaretDown size={14} /> : <CaretRight size={14} />}
                            </button>
                            <Folder size={18} weight="fill" color={folder.color} />
                            <span className="folder-name">{folder.name}</span>
                            <span className="folder-count">{subs.length}</span>
                        </div>

                        {isOpen && (
                            <div className="vids-folder-tree__children">
                                {subs.map(sub => (
                                    <div
                                        key={sub.channelId}
                                        className="vids-folder-tree__item channel"
                                        onClick={() => onSelectChannel(sub.channelId)}
                                    >
                                        <Hash size={16} />
                                        <span>{sub.channelName}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}

            <div className="vids-folder-tree__section-title">Abonnements sans dossier</div>
            <div className="vids-folder-tree__children root-subs">
                {getFolderSubs(null).map(sub => (
                    <div
                        key={sub.channelId}
                        className="vids-folder-tree__item channel"
                        onClick={() => onSelectChannel(sub.channelId)}
                    >
                        <Hash size={16} />
                        <span>{sub.channelName}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FolderTree;
