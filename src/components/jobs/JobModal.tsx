import { FC, SyntheticEvent, useState } from "react";
import { Modal, Button, Label, Input, Select } from "@bka-stuff/mfe-utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateJob } from "../../hooks/jobHooks";
import { useGetRecruiters } from "../../hooks/recruiterHooks";

type JobModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const JobModal: FC<JobModalProps> = ({ isOpen, onClose }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [workFrom, setWorkFrom] = useState('remote');
  const [recruiter, setRecruiter] = useState('');
  const [dateApplied, setDateApplied] = useState<Date | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyState, setCompanyState] = useState('');
  const [poc, setPoc] = useState('');
  const [pocTitle, setPocTitle] = useState('');
  const { data: recruiters } = useGetRecruiters();

  const { mutate: createJob } = useCreateJob();

  function closeModal() {
    onClose();
  }

  async function submit(e?: SyntheticEvent) {
    e?.preventDefault();
    if (!validateForm()) return;
    const jobToSave: Obj = {
      jobTitle,
      workFrom,
      dateApplied: dateApplied?.toISOString(),
      companyName,
    };
    if (recruiter) jobToSave.recruiter = recruiter;
    if (companyAddress) jobToSave.companyAddress = companyAddress;
    if (companyCity) jobToSave.companyCity = companyCity;
    if (companyState) jobToSave.companyState = companyState;
    if (poc) jobToSave.poc = poc;
    if (pocTitle) jobToSave.pocTitle = pocTitle;

    createJob(jobToSave);
    closeModal();
  }

  function validateForm() {
    return !!jobTitle && !!workFrom && !!dateApplied && !!companyName
  }

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div className="job-modal-body">
        <h2 className="tw:mb-[16px]">New Job</h2>
        <form onSubmit={submit}>
          <div>
            <Label text="Job Title *" />
            <Input
              type="text"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              full
              autofocus
            />
          </div>

          <div>
            <Label text="Work Location *" />
            <Select
              name="workFrom"
              value={workFrom}
              onChange={(e) => setWorkFrom(e.target.value)}
              full
            >
              <option value={'remote'}>Remote</option>
              <option value={'hybrid'}>Hybrid</option>
              <option value={'on-site'}>On-site</option>
            </Select>
          </div>

          <div>
            <Label text="Recruiter" />
            <Select
              name="recruiter"
              value={recruiter}
              onChange={(e) => setRecruiter(e.target.value)}
              full
            >
              <option value="">--Select a recruiter</option>
              {recruiters?.map((r: any) => {
                return <option key={r.id} value={r.id}>{r.name}</option>
              })}
            </Select>
          </div>

          <div>
            <Label text="Date Applied *" />
            <DatePicker
              wrapperClassName="job-modal-date-picker"
              selected={dateApplied}
              onChange={(date: Date | null) => setDateApplied(date)}
              placeholderText="Select a date"
            />
          </div>

          <div>
            <Label text="Company Name *" />
            <Input
              type="text"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              full
            />
          </div>

          <div>
            <Label text="Company Address" />
            <Input
              type="text"
              name="companyAddress"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              full
            />
          </div>

          <div>
            <Label text="Company City" />
            <Input
              type="text"
              name="companyCity"
              value={companyCity}
              onChange={(e) => setCompanyCity(e.target.value)}
              full
            />
          </div>

          <div>
            <Label text="Company State" />
            <Input
              type="text"
              name="companyState"
              value={companyState}
              onChange={(e) => setCompanyState(e.target.value)}
              full
            />
          </div>

          <div>
            <Label text="Point of Contact" />
            <Input
              type="text"
              name="poc"
              value={poc}
              onChange={(e) => setPoc(e.target.value)}
              full
            />
          </div>

          <div>
            <Label text="POC Title" />
            <Input
              type="text"
              name="pocTitle"
              value={pocTitle}
              onChange={(e) => setPocTitle(e.target.value)}
              full
            />
          </div>

          <div className="tw:mt-[16px] tw:flex tw:justify-end">
            <button type="submit" style={{ display: 'none' }} />
            <Button variant="red" text="Cancel" onClick={closeModal} />
            <Button
              variant="green"
              text="Save"
              onClick={submit}
              disabled={!validateForm()}
              last
            />
          </div>
        </form>
      </div >
    </Modal >
  );
};

export default JobModal;
