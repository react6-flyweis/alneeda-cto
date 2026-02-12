import React, { useState, useEffect, useRef, useCallback } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}

interface RGB {
  r: number;
  g: number;
  b: number;
  a: number;
}

// --- Helper Functions ---

const hsvToRgb = ({ h, s, v, a }: HSV): RGB => {
  const sDocs = s / 100;
  const vDocs = v / 100;
  const c = vDocs * sDocs;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vDocs - c;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
};

const rgbToHex = ({ r, g, b }: RGB): string => {
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : null;
};

const rgbToHsv = ({ r, g, b, a }: RGB): HSV => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  let h = 0;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100, a };
};

// --- Components ---

interface AppColorDialogProps {
  initialColor?: string;
  onApply: (color: string) => void;
  onCancel: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AppColorDialog({
  initialColor = "#CF2027",
  onApply,
  onCancel,
  open,
  setOpen,
}: AppColorDialogProps) {
  // Initialize HSV from initialColor
  const initialRgb = hexToRgb(initialColor) || { r: 207, g: 32, b: 39, a: 1 };
  const initialHsv = rgbToHsv(initialRgb);

  const [hsv, setHsv] = useState<HSV>(initialHsv);
  const [hexInput, setHexInput] = useState(initialColor.toUpperCase());
  const [savedColors, setSavedColors] = useState<string[]>([
    "#FF4D4D",
    "#FF9F43",
    "#FDCB6E",
    "#55EFC4",
    "#00CEC9",
    "#0984E3",
    "#6C5CE7",
    "#E84393",
    "#E17055",
    "#D63031",
    "#A29BFE",
    "#00B894",
    "#16A085",
    "#74B9FF",
    "#81ECEC",
  ]);

  // Update Hex Input when HSV changes (drag)
  useEffect(() => {
    const rgb = hsvToRgb(hsv);
    const hex = rgbToHex(rgb);
    // only update if not currently editing (not fully strict here for simplicity)
    setHexInput(hex);
  }, [hsv]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    if (/^#?[0-9A-F]{6}$/i.test(val)) {
      const rgb = hexToRgb(val);
      if (rgb) {
        setHsv(rgbToHsv(rgb));
      }
    }
  };

  const handleSaturationValueChange = useCallback((s: number, v: number) => {
    setHsv((prev) => ({ ...prev, s, v }));
  }, []);

  const handleHueChange = useCallback((h: number) => {
    setHsv((prev) => ({ ...prev, h }));
  }, []);

  const handleAlphaChange = useCallback((a: number) => {
    setHsv((prev) => ({ ...prev, a }));
  }, []);

  const currentColorHex = rgbToHex(hsvToRgb(hsv));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md gap-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Choose App Color</DialogTitle>
        </DialogHeader>
        <div className="">
          {/* Saturation/Value Area */}
          <div className="mb-5 relative">
            <SaturationValuePicker
              hsv={hsv}
              onChange={handleSaturationValueChange}
            />
          </div>

          {/* Sliders */}
          <div className="space-y-4 mb-5">
            <HueSlider h={hsv.h} onChange={handleHueChange} />
            <AlphaSlider hsv={hsv} onChange={handleAlphaChange} />
          </div>

          {/* Hex/Alpha Inputs */}
          <div className="flex gap-2 mb-4">
            <div className="relative">
              <div className="h-10 px-3 py-2 border rounded-md min-w-[80px] text-sm flex items-center justify-between text-gray-700 bg-white shadow-sm">
                <span>Hex</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#6B7280"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 relative">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexChange}
                className="w-full h-10 px-3 border rounded-md text-sm uppercase text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div className="w-20 relative">
              <input
                type="text"
                value={`${Math.round(hsv.a * 100)}%`}
                readOnly
                className="w-full h-10 px-3 border rounded-md text-sm text-center text-gray-700 focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Saved Colors */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">
                Saved colors:
              </span>
              <button className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium">
                <Plus className="size-3" /> Add
              </button>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {savedColors.slice(0, 16).map((color, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "size-8 rounded-full border border-gray-100 flex items-center justify-center relative overflow-hidden transition-all hover:scale-110",
                    color === currentColorHex &&
                      "ring-2 ring-offset-2 ring-blue-500",
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    const rgb = hexToRgb(color);
                    if (rgb) setHsv(rgbToHsv(rgb));
                  }}
                ></button>
              ))}
              <button
                className="size-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-500 hover:text-gray-600 transition-colors"
                onClick={() => {
                  if (!savedColors.includes(currentColorHex)) {
                    setSavedColors([...savedColors, currentColorHex]);
                  }
                }}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-11 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium text-base rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 bg-[#101828] hover:bg-[#1f2937] text-white font-medium text-base rounded-lg shadow-sm"
              onClick={() => onApply(currentColorHex)}
            >
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Subcomponents ---

const SaturationValuePicker = ({
  hsv,
  onChange,
}: {
  hsv: HSV;
  onChange: (s: number, v: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Convert current S/V to X/Y coordinates
  // X = S, Y = 100 - V
  const x = hsv.s;
  const y = 100 - hsv.v;

  const handleMove = useCallback(
    (e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if it's a touch event or mouse event
      const clientX =
        "touches" in e
          ? (e as unknown as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;

      const clientY =
        "touches" in e
          ? (e as unknown as TouchEvent).touches[0].clientY
          : (e as MouseEvent).clientY;

      let newX = ((clientX - rect.left) / rect.width) * 100;
      let newY = ((clientY - rect.top) / rect.height) * 100;

      newX = Math.max(0, Math.min(100, newX));
      newY = Math.max(0, Math.min(100, newY));

      // S = X, V = 100 - Y
      onChange(newX, 100 - newY);
    },
    [onChange],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // Prevent scrolling on touch devices
      if ("touches" in e) {
        e.stopPropagation();
      }
      setIsDragging(true);
      handleMove(e);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove, handleMouseUp]);

  // Background color based on Hue
  const bgColor = `hsl(${hsv.h}, 100%, 50%)`;

  return (
    <div
      ref={containerRef}
      className="w-full h-48 rounded-lg relative cursor-crosshair overflow-hidden touch-none shadow-inner"
      style={{ backgroundColor: bgColor }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

      <div
        className="absolute size-4 border-[2px] border-white rounded-full shadow-sm -ml-2 -mt-2 pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%` }}
      />
    </div>
  );
};

const HueSlider = ({
  h,
  onChange,
}: {
  h: number;
  onChange: (h: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const clientX =
        "touches" in e
          ? (e as unknown as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;

      let newX = (clientX - rect.left) / rect.width;
      newX = Math.max(0, Math.min(1, newX));

      onChange(newX * 360);
    },
    [onChange],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in e) e.stopPropagation();
      setIsDragging(true);
      handleMove(e);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="w-full h-3 rounded-full relative cursor-pointer touch-none"
      style={{
        background:
          "linear-gradient(to right, #FF0000 0%, #FFFF00 17%, #00FF00 33%, #00FFFF 50%, #0000FF 67%, #FF00FF 83%, #FF0000 100%)",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div
        className="absolute size-4 bg-white border border-gray-200 rounded-full shadow-sm -ml-2 -mt-0.5 pointer-events-none active:scale-110 transition-transform"
        style={{ left: `${(h / 360) * 100}%` }}
      />
    </div>
  );
};

const AlphaSlider = ({
  hsv,
  onChange,
}: {
  hsv: HSV;
  onChange: (a: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate RGB strictly for the gradient display (ignoring current Alpha for gradient calc)
  const rgb = hsvToRgb({ ...hsv, a: 1 });
  const colorString = `rgb(${rgb.r},${rgb.g},${rgb.b})`;

  const handleMove = useCallback(
    (e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const clientX =
        "touches" in e
          ? (e as unknown as TouchEvent).touches[0].clientX
          : (e as MouseEvent).clientX;

      let newX = (clientX - rect.left) / rect.width;
      newX = Math.max(0, Math.min(1, newX));

      onChange(newX);
    },
    [onChange],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in e) e.stopPropagation();
      setIsDragging(true);
      handleMove(e);
    },
    [handleMove],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMove, {
        passive: false,
      });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMove, handleMouseUp]);

  return (
    <div
      className="relative w-full h-3 rounded-full cursor-pointer touch-none"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* Checkered Background */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `
                        linear-gradient(45deg, #eee 25%, transparent 25%), 
                        linear-gradient(-45deg, #eee 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #eee 75%), 
                        linear-gradient(-45deg, transparent 75%, #eee 75%)`,
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
            backgroundColor: "white",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 w-full h-full rounded-full"
        style={{
          background: `linear-gradient(to right, transparent, ${colorString})`,
        }}
      />

      <div
        className="absolute size-4 bg-white border border-gray-200 rounded-full shadow-sm -ml-2 -mt-0.5 pointer-events-none active:scale-110 transition-transform z-10"
        style={{ left: `${hsv.a * 100}%` }}
      />
    </div>
  );
};
