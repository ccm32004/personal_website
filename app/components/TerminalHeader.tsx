'use client';
import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc';

export default function TerminalHeader() {
  return (
    <div className="border-neon-purple bg-cyber-darker/90 flex items-center justify-between border-b px-4 py-2">
      <div className="w-24" />
      <div className="text-neon-purple font-mono text-sm">CeceBot Terminal v1.0</div>
      <div className="flex w-24 items-center justify-end gap-2">
        <VscChromeMinimize className="cursor-pointer text-gray-400 hover:text-white" />
        <VscChromeMaximize className="cursor-pointer text-gray-400 hover:text-white" />
        <VscChromeClose className="cursor-pointer text-gray-400 hover:text-white" />
      </div>
    </div>
  );
}
