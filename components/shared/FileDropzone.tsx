"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useDropzone, type Accept } from "react-dropzone";


import { cn } from "@/lib/utils/cn";

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  label?: string;
  sublabel?: string;
  className?: string;
}

export function FileDropzone({
  onDrop,
  accept,
  multiple = false,
  label = "Drop files here",
  sublabel = "or click to browse",
  className,
}: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
  });
  const rootProps = getRootProps();

  return (
    <motion.div>
      <div
        {...rootProps}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border-hover bg-bg-subtle/60 p-8 sm:min-h-64 transition-all duration-200",
          "hover:border-accent hover:bg-accent-subtle",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
          isDragActive && "border-accent bg-accent-subtle scale-[1.01]",
          className,
        )}
      >
        <input {...getInputProps()} />
        <AnimatePresence mode="wait" initial={false}>
          {isDragActive ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Upload className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-text-primary">
                Release to upload
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-subtle text-accent-text transition-transform group-hover:scale-105">
                <Upload className="h-7 w-7" aria-hidden="true" />
              </span>
              <span className="text-base font-semibold text-text-primary">
                {label}
              </span>
              <span className="text-sm text-text-secondary">
                {sublabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
