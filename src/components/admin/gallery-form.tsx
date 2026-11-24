"use client";

import { useActionState } from "react";
import { uploadGalleryAction, type ActionState } from "@/app/actions/admin";
import { fieldClass, primaryButtonClass } from "@/components/admin/admin-ui";

const initial: ActionState = {};

export function GalleryForm() {
  const [state, action, pending] = useActionState(uploadGalleryAction, initial);

  return (
    <form
      action={action}
      encType="multipart/form-data"
      className="max-w-2xl border border-[var(--border)] bg-white"
    >
      <div className="border-b border-[var(--border)] px-4 py-3 sm:px-5">
        <h2 className="font-serif text-lg text-[var(--navy)]">Upload photo</h2>
      </div>
      <div className="grid gap-4 p-4 sm:p-5">
        <input name="title" placeholder="Title" required className={fieldClass} />
        <input name="caption" placeholder="Caption" className={fieldClass} />
        <input
          name="category"
          placeholder="Category"
          defaultValue="Members"
          className={fieldClass}
        />
        <input
          name="file"
          type="file"
          accept="image/*"
          required
          className="text-base file:mr-3 file:min-h-11 file:border-0 file:bg-[var(--navy)] file:px-4 file:text-sm file:text-[var(--cream)]"
        />
        <label className="flex min-h-11 items-center gap-3 text-sm text-[var(--navy)]">
          <input type="checkbox" name="publish" defaultChecked className="size-4" />
          Publish now
        </label>
        {state.error ? <p className="text-sm text-[#6b2d22]">{state.error}</p> : null}
        {state.success ? <p className="text-sm text-[#1c4532]">{state.success}</p> : null}
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending ? "Uploading…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
