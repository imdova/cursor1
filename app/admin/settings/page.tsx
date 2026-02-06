"use client";

import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">
        Configure your academy and integrations.
      </p>
      <div className="grid gap-4 max-w-2xl">
        <Link
          href="/admin/settings/whatsapp-templates"
          className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-admin-primary/30 hover:shadow-md transition-all"
        >
          <div className="w-12 h-12 rounded-lg bg-[#e8e8f5] flex items-center justify-center text-2xl">
            💬
          </div>
          <div>
            <p className="font-semibold text-gray-900">WhatsApp Templates</p>
            <p className="text-sm text-gray-500">
              Manage automated WhatsApp notification messages
            </p>
          </div>
          <span className="ml-auto text-admin-primary">→</span>
        </Link>
      </div>
    </div>
  );
}
