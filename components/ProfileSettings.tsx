import React, { useState, useRef, useEffect } from 'react';
import { X, Camera, Save, Lock, Mail, User as UserIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose, user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [photo, setPhoto] = useState<string | undefined>(user.photo);
  
  // Password States
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
      resetPasswordFields();
      setMessage(null);
    }
  }, [isOpen, user]);

  const resetPasswordFields = () => {
    setShowPasswordSection(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Password Validation
    if (showPasswordSection) {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'Preencha todos os campos de senha.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'As novas senhas não coincidem.' });
            return;
        }
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'A nova senha deve ter pelo menos 6 caracteres.' });
            return;
        }
        // In a real app, we would validate currentPassword against backend
    }

    onUpdateUser({
      ...user,
      name,
      email,
      photo
    });

    setMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
    
    // Close after a brief delay on success
    setTimeout(() => {
        onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
          <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Configurações de Perfil</h2>
              <p className="text-slate-400 text-sm">Gerencie suas informações pessoais</p>
          </div>
          <button onClick={onClose} className="bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-full transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar">
            <form onSubmit={handleSave} className="space-y-8">
                
                {/* Photo Section */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800">
                            {photo ? (
                                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-violet-300 dark:text-slate-600">
                                    <UserIcon size={64} />
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={32} />
                        </div>
                        <div className="absolute bottom-0 right-2 bg-violet-600 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
                            <Camera size={16} />
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <p className="mt-3 text-sm text-slate-400">Toque para alterar a foto</p>
                </div>

                {/* Basic Info */}
                <div className="space-y-5">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Nome Completo</label>
                        <div className="relative group">
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors" size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-violet-200 dark:focus:border-violet-800 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">E-mail</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 dark:group-focus-within:text-violet-400 transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-violet-200 dark:focus:border-violet-800 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-900/30 outline-none transition-all font-medium text-slate-700 dark:text-slate-200"
                            />
                        </div>
                        <p className="text-xs text-amber-500 mt-1 ml-1">* Alterar o e-mail pode afetar a sincronização de dados antigos.</p>
                    </div>
                </div>

                {/* Password Toggle */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                    <button 
                        type="button"
                        onClick={() => setShowPasswordSection(!showPasswordSection)}
                        className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-bold text-sm hover:underline"
                    >
                        <Lock size={16} />
                        {showPasswordSection ? 'Cancelar alteração de senha' : 'Alterar Senha'}
                    </button>

                    {showPasswordSection && (
                        <div className="mt-4 space-y-4 animate-fade-in">
                             <div>
                                <input
                                    type="password"
                                    placeholder="Senha Atual"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:border-violet-300 dark:focus:border-violet-700 dark:text-white"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="password"
                                    placeholder="Nova Senha"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:border-violet-300 dark:focus:border-violet-700 dark:text-white"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirmar Nova Senha"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 outline-none focus:border-violet-300 dark:focus:border-violet-700 dark:text-white"
                                />
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Feedback Message */}
                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                        {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                        <span className="font-medium text-sm">{message.text}</span>
                    </div>
                )}

                {/* Actions */}
                <button
                    type="submit"
                    className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold rounded-xl shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    Salvar Alterações
                </button>

            </form>
        </div>
      </div>
    </div>
  );
};
