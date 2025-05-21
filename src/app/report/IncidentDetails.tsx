import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface IncidentDetailsProps {
  threatLevel: number[];
  setThreatLevel: (value: number[]) => void;
}

export default function IncidentDetails({ threatLevel, setThreatLevel }: IncidentDetailsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Incident Details</h2>
      <div className="space-y-3">
        <div>
          <Label htmlFor="mining-type" className="text-sm font-medium">
            Type of Mining Activity
          </Label>
          <Select>
            <SelectTrigger id="mining-type" className="w-full mt-1">
              <SelectValue placeholder="Select mining activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Common Types</SelectLabel>
                <SelectItem value="riverbed">Riverbed Mining</SelectItem>
                <SelectItem value="forest">Forest Clearing for Mining</SelectItem>
                <SelectItem value="openpit">Open-pit Mining</SelectItem>
                <SelectItem value="underground">Unauthorized Underground Mining</SelectItem>
                <SelectItem value="processing">Illegal Processing Facility</SelectItem>
                <SelectItem value="other">Other (Specify in Description)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="description" className="text-sm font-medium">
            Describe what you saw
          </Label>
          <Textarea
            id="description"
            placeholder="Provide as much detail as possible about the activity, equipment used, number of people involved, etc."
            className="min-h-[120px] mt-1 text-sm"
          />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
            <Label className="text-sm font-medium">Threat Level</Label>
            <span className="text-xs font-medium">
              {threatLevel[0] === 0 && "Very Low"}
              {threatLevel[0] === 1 && "Low"}
              {threatLevel[0] === 2 && "Medium"}
              {threatLevel[0] === 3 && "High"}
              {threatLevel[0] === 4 && "Very High"}
            </span>
          </div>
          <Slider
            defaultValue={[2]}
            max={4}
            step={1}
            value={threatLevel}
            onValueChange={setThreatLevel}
            className="py-3"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span className="text-green-500">Very Low</span>
            <span className="text-green-400">Low</span>
            <span className="text-yellow-500">Medium</span>
            <span className="text-orange-500">High</span>
            <span className="text-red-500">Very High</span>
          </div>
        </div>
      </div>
    </div>
  );
} 