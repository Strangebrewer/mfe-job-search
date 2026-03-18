import { FC, SyntheticEvent, useState } from "react";
import { Modal, Button, Label, Input, Select } from "@bka-stuff/mfe-utils";
import { useUpdateJob } from "../../hooks/jobHooks";
import { useGetRecruiters } from "../../hooks/recruiterHooks";

type JobModalProps = {
  isOpen: boolean;
  onClose: () => void;
}
