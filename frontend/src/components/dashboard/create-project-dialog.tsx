"use client";

import React, { useState, useRef } from "react";
import { X, Upload, Link2, Globe, FileJson, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { ServerService } from "@/services/server.service";
import { CreateServerPayload } from "@/types/api";

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateProjectDialog({ isOpen, onClose, onSuccess }: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [specUrl, setSpecUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [specFile, setSpecFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputMethod, setInputMethod] = useState<"none" | "url" | "file">("none");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const resetForm = () => {
    setName("");
    setSpecUrl("");
    setBaseUrl("");
    setSpecFile(null);
    setInputMethod("none");
    setError(null);
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/json", "application/x-yaml", "text/yaml", "text/x-yaml"];
      const isYaml = file.name.endsWith(".yaml") || file.name.endsWith(".yml");
      const isJson = file.type === "application/json" || file.name.endsWith(".json");

      if (!isYaml && !isJson) {
        setError("Only JSON or YAML files are supported");
        setSpecFile(null);
        return;
      }
      setError(null);
      setSpecFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const payload: CreateServerPayload = {
        name: name.trim(),
        spec_file: inputMethod === "file" ? specFile : null,
        spec_url: inputMethod === "url" && specUrl.trim() ? specUrl.trim() : null,
        base_url: baseUrl.trim() || null,
      };

      await ServerService.createServer(payload);

      toast.success(
        "Project Created",
        `"${name.trim()}" has been created successfully.`,
        "bottom-right"
      );

      resetForm();
      onSuccess();
      onClose();
    } catch (err: any) {
      // Handle validation errors (422) which return array of {type, loc, msg, input}
      let message = "Failed to create project. Please try again.";
      const detail = err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        // Join all validation error messages
        message = detail.map((e: any) => e.msg).join(", ");
      } else if (typeof detail === "string") {
        message = detail;
      } else if (err?.message) {
        message = err.message;
      }

      setError(message);
      toast.error("Creation Failed", message, "bottom-right");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#030914]/95 backdrop-blur-xl border border-blue-900/40 rounded-3xl shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-blue-900/30">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Create New Project</h2>
              <p className="text-xs font-mono text-blue-400/50 mt-0.5">Configure your MCP server</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="p-2 rounded-xl text-blue-400/60 hover:text-white hover:bg-blue-950/40 transition-all duration-200 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Error Display */}
            {error && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-950/30 border border-red-900/40">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-xs font-mono text-red-400/90">{error}</p>
              </div>
            )}

            {/* Project Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider">
                Project Name <span className="text-red-400">*</span>
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Production API Gateway"
                disabled={isLoading}
                className="bg-[#020c1d] border-blue-900/40 text-white focus:border-brand-blue/60 placeholder:text-blue-400/30"
              />
            </div>

            {/* Spec Source Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider">
                Specification Source <span className="text-blue-400/40">(Optional)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInputMethod(inputMethod === "url" ? "none" : "url")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
                    inputMethod === "url"
                      ? "bg-brand-blue/15 border-brand-blue/40 text-brand-yellow"
                      : "bg-[#020c1d] border-blue-900/40 text-blue-400/70 hover:border-blue-700/50"
                  )}
                >
                  <Link2 className="w-4 h-4" />
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setInputMethod(inputMethod === "file" ? "none" : "file")}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200",
                    inputMethod === "file"
                      ? "bg-brand-blue/15 border-brand-blue/40 text-brand-yellow"
                      : "bg-[#020c1d] border-blue-900/40 text-blue-400/70 hover:border-blue-700/50"
                  )}
                >
                  <Upload className="w-4 h-4" />
                  File
                </button>
              </div>
            </div>

            {/* URL Input */}
            {inputMethod === "url" && (
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider">
                  Specification URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/40" />
                  <Input
                    type="url"
                    value={specUrl}
                    onChange={(e) => setSpecUrl(e.target.value)}
                    placeholder="https://api.example.com/openapi.json"
                    disabled={isLoading}
                    className="pl-10 bg-[#020c1d] text-white border-blue-900/40 focus:border-brand-blue/60 placeholder:text-blue-400/30"
                  />
                </div>
                <p className="text-[10px] font-mono text-blue-400/40">
                  Supports OpenAPI (JSON/YAML) or MCP tools-list format
                </p>
              </div>
            )}

            {/* File Upload */}
            {inputMethod === "file" && (
              <div className="space-y-2">
                <label className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider">
                  Specification File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.yaml,.yml"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200",
                    specFile
                      ? "bg-brand-blue/10 border-brand-blue/40 text-brand-yellow"
                      : "bg-[#020c1d] border-blue-900/40 text-blue-400/70 hover:border-blue-700/50"
                  )}
                >
                  <FileJson className="w-5 h-5" />
                  <div className="flex flex-col items-start text-left">
                    {specFile ? (
                      <>
                        <span className="text-sm font-medium">{specFile.name}</span>
                        <span className="text-[10px] font-mono text-blue-400/50">
                          {(specFile.size / 1024).toFixed(1)} KB
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium">Click to upload</span>
                        <span className="text-[10px] font-mono text-blue-400/40">
                          JSON or YAML files only
                        </span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}

            {/* Base URL */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-medium text-blue-400/70 uppercase tracking-wider">
                Base URL <span className="text-blue-400/40">(Optional)</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/40" />
                <Input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder="https://api.example.com"
                  disabled={isLoading}
                  className="pl-10 bg-[#020c1d] text-white border-blue-900/40 focus:border-brand-blue/60 placeholder:text-blue-400/30"
                />
              </div>
              <p className="text-[10px] font-mono text-blue-400/40">
                Upstream API endpoint for tool execution
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="flex-1 h-11 rounded-xl bg-transparent text-blue-400/70 border border-blue-900/40 hover:bg-blue-950/40 hover:text-white transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-11 rounded-xl bg-brand-blue/90 text-white border border-brand-blue/40 hover:bg-brand-blue hover:border-brand-blue/60 shadow-[0_4px_15px_rgba(0,123,255,0.25)] transition-all duration-200 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}