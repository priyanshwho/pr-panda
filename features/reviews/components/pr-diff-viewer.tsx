"use client";

import React, { useState, useEffect } from "react";
import { getPrFilesAction } from "../actions/pr-diff";
import { AiReviewMarkdown } from "@/features/pull-requests/components/ai-review-markdown";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

type PrFile = {
  filePath: string;
  patch: string;
};

type PrDiffViewerProps = {
  prId: string;
  reviewComment: string;
};

export function PrDiffViewer({ prId, reviewComment }: PrDiffViewerProps) {
  const [activeTab, setActiveTab] = useState<"report" | "diff">("report");
  const [files, setFiles] = useState<PrFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<PrFile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "diff" && files.length === 0) {
      setLoading(true);
      getPrFilesAction(prId)
        .then((data) => {
          setFiles(data);
          if (data.length > 0) {
            setSelectedFile(data[0]);
          }
        })
        .catch((err: any) => {
          toast.error(err.message || "Failed to load files.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeTab, prId, files.length]);

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Switcher */}
      <div className="flex border-b border-border pb-1 gap-6">
        <button
          onClick={() => setActiveTab("report")}
          className={`pb-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "report"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Review Report
        </button>
        <button
          onClick={() => setActiveTab("diff")}
          className={`pb-2 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
            activeTab === "diff"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Split Diff View
        </button>
      </div>

      {activeTab === "report" ? (
        <AiReviewMarkdown content={reviewComment} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
          {/* Left Panel: Diff Explorer */}
          <div className="flex flex-col gap-4 border border-border bg-card rounded-xl p-4 overflow-hidden h-[600px]">
            <h3 className="font-heading text-sm font-semibold select-none">PR Changed Files</h3>
            {loading ? (
              <div className="flex flex-1 items-center justify-center">
                <Spinner className="size-6 text-primary" />
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-xs text-muted-foreground">
                No changed files found.
              </div>
            ) : (
              <div className="flex flex-1 gap-4 overflow-hidden">
                {/* Filename sub-sidebar */}
                <div className="w-1/3 border-r border-border/60 pr-2 flex flex-col gap-1 overflow-y-auto">
                  {files.map((file) => (
                    <button
                      key={file.filePath}
                      onClick={() => setSelectedFile(file)}
                      className={`text-left text-xs p-2 rounded-lg truncate transition-all cursor-pointer ${
                        selectedFile?.filePath === file.filePath
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                      title={file.filePath}
                    >
                      {file.filePath.split("/").pop()}
                    </button>
                  ))}
                </div>
                {/* Patch details */}
                <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 rounded-lg p-3 font-mono text-[11px] select-text">
                  {selectedFile ? (
                    <div className="flex flex-col">
                      <div className="text-[10px] text-slate-400 border-b border-slate-800 pb-2 mb-2 font-sans truncate select-none">
                        {selectedFile.filePath}
                      </div>
                      {selectedFile.patch.split("\n").map((line, idx) => {
                        let bgClass = "";
                        let textClass = "";

                        if (line.startsWith("+")) {
                          bgClass = "bg-emerald-500/10 border-l-[3px] border-emerald-500 px-2";
                          textClass = "text-emerald-400";
                        } else if (line.startsWith("-")) {
                          bgClass = "bg-rose-500/10 border-l-[3px] border-rose-500 px-2";
                          textClass = "text-rose-400";
                        } else if (line.startsWith("@@")) {
                          bgClass = "bg-sky-500/5 text-sky-400/60 px-2 font-semibold text-[10px]";
                        } else {
                          bgClass = "px-2 opacity-80";
                        }

                        return (
                          <div key={idx} className={`whitespace-pre-wrap py-0.5 leading-relaxed ${bgClass} ${textClass}`}>
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-500 font-sans select-none">
                      Select a file to view patch
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel: AI review Comments */}
          <div className="flex flex-col gap-4 border border-border bg-card rounded-xl p-4 overflow-y-auto h-[600px] shadow-inner select-text">
            <h3 className="font-heading text-sm font-semibold select-none">AI Comments Context</h3>
            <AiReviewMarkdown content={reviewComment} />
          </div>
        </div>
      )}
    </div>
  );
}
