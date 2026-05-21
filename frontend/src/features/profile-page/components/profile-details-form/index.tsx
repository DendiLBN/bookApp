import { Loader2, Save } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { cn } from "@/common/utils/cn";
import { profileFormLimits } from "@/features/profile-page/consts/profile-form";
import type { TProfileFormErrors } from "@/features/profile-page/utils/get-profile-form-errors";
import type { TUpdateProfilePayload } from "@/features/users/types";

type TProfileDetailsFormProps = {
  errors: TProfileFormErrors;
  isUpdatingProfile: boolean;
  values: TUpdateProfilePayload;
  handleFieldChange: (field: keyof TUpdateProfilePayload, value: string) => void;
  handleSubmit: () => void;
};

export const ProfileDetailsForm = ({
  errors,
  handleFieldChange,
  handleSubmit,
  isUpdatingProfile,
  values,
}: TProfileDetailsFormProps) => (
  <article className="rounded-l border border-app-border bg-app-surface p-s shadow-app-s">
    <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Account details</h2>
    <div className="grid gap-xs sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm font-semibold text-app-text">
        First name
        <Input
          className={cn(errors.firstName ? "border-app-danger" : undefined)}
          maxLength={profileFormLimits.nameMaxLength}
          onChange={(event) => handleFieldChange("firstName", event.target.value)}
          value={values.firstName}
        />
        {errors.firstName && <span className="text-xs text-app-danger">{errors.firstName}</span>}
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold text-app-text">
        Last name
        <Input
          className={cn(errors.lastName ? "border-app-danger" : undefined)}
          maxLength={profileFormLimits.nameMaxLength}
          onChange={(event) => handleFieldChange("lastName", event.target.value)}
          value={values.lastName}
        />
        {errors.lastName && <span className="text-xs text-app-danger">{errors.lastName}</span>}
      </label>
    </div>
    <label className="mt-xs flex flex-col gap-1 text-sm font-semibold text-app-text">
      Email
      <Input
        className={cn(errors.email ? "border-app-danger" : undefined)}
        onChange={(event) => handleFieldChange("email", event.target.value)}
        type="email"
        value={values.email}
      />
      {errors.email && <span className="text-xs text-app-danger">{errors.email}</span>}
    </label>
    <Button className="mt-s" disabled={isUpdatingProfile} onClick={handleSubmit} type="button">
      {isUpdatingProfile ? <Loader2 className="animate-spin" /> : <Save />}
      Save profile
    </Button>
  </article>
);
