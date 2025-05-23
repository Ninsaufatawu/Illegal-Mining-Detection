import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Upload, Trash2 } from "lucide-react";

interface EvidenceUploadProps {
  files: File[];
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  blurFaces: boolean;
  setBlurFaces: (blur: boolean) => void;
  stripLocation: boolean;
  setStripLocation: (strip: boolean) => void;
}

export default function EvidenceUpload({ 
  files, 
  handleFileChange, 
  removeFile, 
  blurFaces, 
  setBlurFaces, 
  stripLocation, 
  setStripLocation 
}: EvidenceUploadProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Evidence Upload</h2>
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-5 text-center cursor-pointer hover:bg-muted/50 transition-colors">
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer w-full h-full block">
          <div className="space-y-1">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
            <h3 className="font-medium text-sm">Drag and drop files here or click to browse</h3>
            <p className="text-xs text-muted-foreground">
              Photos and videos only. Maximum 5 files, 5MB per file.
            </p>
          </div>
        </label>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Uploaded Files ({files.length}/5)</h3>
          <ScrollArea className="h-[150px]">
            <div className="space-y-1">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <p className="text-[10px] text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-100 h-6 w-6 p-0"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
      <div className="space-y-3 bg-muted p-3 rounded-md">
        <h3 className="font-medium text-sm">Privacy Options</h3>
        <div className="space-y-1.5">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="blur-faces"
              checked={blurFaces}
              onCheckedChange={(checked) => setBlurFaces(checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-0.5 leading-none">
              <Label htmlFor="blur-faces" className="text-xs font-medium cursor-pointer">
                Automatically blur faces in images/videos
              </Label>
              <p className="text-[10px] text-muted-foreground">
                Recommended for protecting identities of people in the area.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="strip-location"
              checked={stripLocation}
              onCheckedChange={(checked) => setStripLocation(checked as boolean)}
              className="mt-0.5"
            />
            <div className="grid gap-0.5 leading-none">
              <Label htmlFor="strip-location" className="text-xs font-medium cursor-pointer">
                Remove location metadata from files
              </Label>
              <p className="text-[10px] text-muted-foreground">
                Prevents extraction of GPS coordinates from your photos.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Alert variant="destructive" className="bg-red-50 text-red-800 border border-red-200 py-2">
        <AlertTitle className="flex items-center text-xs font-medium">
          <span className="text-red-600 mr-1">⚠️</span>
          Important Safety Warning
        </AlertTitle>
        <AlertDescription className="text-[10px]">
          Never put yourself at risk to gather evidence. Your safety is the priority. If possible, maintain a safe
          distance when documenting illegal activities.
        </AlertDescription>
      </Alert>
    </div>
  );
} 