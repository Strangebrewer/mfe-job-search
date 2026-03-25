import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetRecruiters } from "../../hooks/recruiterHooks";
import { STATUS_OPTIONS, WORK_FROM_OPTIONS } from "../../utils/constants";
import { Button } from "@bka-stuff/mfe-utils";

type JobsFilterProps = {
  onSearch: (params: Record<string, any>) => void;
  onClear: () => void;
};

const EMPTY_FORM: Obj = {
  company: '',
  status: '',
  workFrom: '',
  recruiter: '',
  dateMin: null as Date | null,
  dateMax: null as Date | null,
  archived: false,
  includeDeclined: false,
};

function buildParams(f: Obj): Record<string, any> {
  const params: Obj = {};
  if (f.company) params.company = f.company;
  if (f.status) params.status = f.status;
  if (f.workFrom) params.workFrom = f.workFrom;
  if (f.recruiter) params.recruiter = f.recruiter;
  if (f.dateMin) params.dateMin = f.dateMin.toISOString();
  if (f.dateMax) params.dateMax = f.dateMax.toISOString();
  if (f.archived) params.archived = 'true';
  if (f.includeDeclined) params.includeDeclined = 'true';
  return params;
}

const JobsFilter: FC<JobsFilterProps> = ({ onSearch, onClear }) => {
  const [form, setForm] = useState(EMPTY_FORM);
  const { data: recruiters } = useGetRecruiters();

  function fireImmediate(updated: Obj) {
    setForm(updated);
    onSearch(buildParams(updated));
  }

  function handleSearch() {
    onSearch(buildParams(form));
  }

  function handleClear() {
    setForm(EMPTY_FORM);
    onClear();
  }

  return (
    <div className="jobs-filter">
      <div className="jobs-filter-fields">
        <input
          className="jobs-filter-input"
          placeholder="Company"
          value={form.company}
          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
        />

        <select
          className="jobs-filter-select"
          value={form.status}
          onChange={e => fireImmediate({ ...form, status: e.target.value })}
        >
          <option value="">Status</option>
          {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>

        <select
          className="jobs-filter-select"
          value={form.workFrom}
          onChange={e => fireImmediate({ ...form, workFrom: e.target.value })}
        >
          <option value="">Work Location...</option>
          {WORK_FROM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>

        <select
          className="jobs-filter-select"
          value={form.recruiter}
          onChange={e => fireImmediate({ ...form, recruiter: e.target.value })}
        >
          <option value="">Recruiter...</option>
          {recruiters?.map((r: Obj) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>

        <DatePicker
          className="jobs-filter-input"
          placeholderText="Date from"
          selected={form.dateMin}
          onChange={(date: Date | null) => setForm(f => ({ ...f, dateMin: date }))}
          selectsStart
          startDate={form.dateMin}
          endDate={form.dateMax}
          isClearable
        />

        <DatePicker
          className="jobs-filter-input"
          placeholderText="Date to"
          selected={form.dateMax}
          onChange={(date: Date | null) => setForm(f => ({ ...f, dateMax: date }))}
          selectsEnd
          startDate={form.dateMin}
          endDate={form.dateMax}
          minDate={form.dateMin}
          isClearable
        />

      </div>

      <div className="jobs-filter-actions">
        <Button variant="red" text="Search" onClick={handleSearch} />
        <Button variant="grey" text="Clear" onClick={handleClear} />
      </div>

      <div className="jobs-filter-checks">
        <label className="jobs-filter-checkbox">
          <input
            type="checkbox"
            checked={form.archived}
            onChange={e => fireImmediate({ ...form, archived: e.target.checked })}
          />
          Include archived
        </label>
        <label className="jobs-filter-checkbox">
          <input
            type="checkbox"
            checked={form.includeDeclined}
            onChange={e => fireImmediate({ ...form, includeDeclined: e.target.checked })}
          />
          Include declined
        </label>
      </div>
    </div>
  );
};

export default JobsFilter;
