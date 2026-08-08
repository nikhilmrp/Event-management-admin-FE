import React from "react";

export interface TabItem {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[]; // Tabs to render
  activeKey: string; // Key of the currently active tab
  onChange: (key: string) => void; // Called with the tab's key when clicked
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeKey, onChange, className = "" }) => {
  return (
    <div className={`flex items-center border-b border-gray-200 dark:border-gray-800 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
              isActive
                ? "text-brand-500 dark:text-brand-400 border-brand-500 dark:border-brand-400"
                : "bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
