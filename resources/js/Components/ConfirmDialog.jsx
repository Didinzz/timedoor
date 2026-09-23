import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FiAlertTriangle, FiInfo } from "react-icons/fi";

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = "Apakah Anda Yakin?",
    description = "Tindakan ini tidak dapat dibatalkan.",
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    isDestructive = true, // Jika false, warna akan menjadi tema utama (biru/hijau)
    isLoading = false
}) {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isLoading && onClose()}>
            {/* 👇 Ukuran diperkecil jadi 400px agar lebih manis */}
            <DialogContent preventClose={isLoading} className="sm:max-w-120 p-6 border-border/60 shadow-2xl">
                <DialogHeader>
                    {/* Tata Letak Alert Modern (Ikon dan Teks Bersebelahan) */}
                    <div className="flex items-start gap-4 text-left">
                        <div className={`p-3 rounded-full shrink-0 ${isDestructive ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                            {isDestructive ? (
                                <FiAlertTriangle className="w-6 h-6 text-destructive" />
                            ) : (
                                <FiInfo className="w-6 h-6 text-primary" />
                            )}
                        </div>
                        <div>
                            <DialogTitle className="text-[19px] font-bold tracking-tight text-foreground mt-0.5">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                                {description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <DialogFooter className="mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                        className="cursor-pointer rounded-xl h-10 px-5 shadow-sm border-border bg-background hover:bg-accent font-semibold"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        variant={isDestructive ? "destructive" : "default"}
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="cursor-pointer rounded-xl h-10 px-6 font-bold shadow-md focus:outline-none transition-transform active:scale-95"
                    >
                        {isLoading ? "Memproses..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}