// ============================================================================
// BUSINESS JAPANESE (ビジネス日本語) CERTIFICATE MODAL
// JLPTMaster Business Japanese Certificate of Completion
// ============================================================================

import React from 'react';
import { X, Award, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BusinessCertificateRecord } from '../../types/business';

interface BusinessCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate?: BusinessCertificateRecord;
}

export const BusinessCertificateModal: React.FC<BusinessCertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Certificate Preview Frame */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-4 border-double border-amber-600/60 dark:border-amber-500/40 text-center space-y-6 relative shadow-inner">
          {/* Top Emblem */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Award size={36} className="fill-slate-950" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">
              Certificate of Completion • 修了認定証
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-japanese">
              ビジネス日本語 課程修了証
            </h2>
          </div>

          <p className="text-xs text-slate-500 italic">
            This certificate certifies that the following candidate has successfully completed the curriculum and demonstrated professional proficiency in Japanese business communication.
          </p>

          {/* Student Name */}
          <div className="py-3 border-y border-amber-300/60 dark:border-amber-900/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Awarded To
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {certificate.studentName}
            </div>
          </div>

          {/* Course & Score Details */}
          <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Track:</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {certificate.courseName}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Exam Score:</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                {certificate.scorePercentage}% (Passed)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Issued Date:</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                {certificate.issuedDate}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Credential ID:</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono truncate block">
                {certificate.id}
              </span>
            </div>
          </div>

          {/* Signature and Seal Stamp */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800 max-w-md mx-auto">
            <div className="text-left text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">JLPTMaster Platform</span>
              <span className="text-[11px] text-slate-400">Business Japanese Curriculum Committee</span>
            </div>

            {/* Traditional Japanese Red Seal */}
            <div className="w-16 h-16 rounded-2xl border-2 border-red-600 text-red-600 font-kanji font-black text-xs flex flex-col items-center justify-center rotate-6 shadow-sm">
              <span>認定</span>
              <span>之印</span>
            </div>
          </div>

          {/* Educational Disclaimer */}
          <div className="text-[10px] text-slate-400 dark:text-slate-500 italic max-w-md mx-auto">
            * This is an internal JLPTMaster curriculum certificate of completion reflecting completed coursework and examination performance. It does not represent an official Japanese government credential.
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer size={15} />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
