import { FC, useState } from "react";
import { useGetRecruiters } from "../../hooks/recruiterHooks";
import { useUpdateJob } from "../../hooks/jobHooks";
import { ActionButton } from "@bka-stuff/mfe-utils";
import DatePicker from "react-datepicker";
import { format, parseISO } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type JobRowGridProps = {
  job: Obj;
  onClickDelete: (id: string, name: string) => void;
  onClickArchive: (id: string, name: string) => void;
}

const STATUS_OPTIONS = ['applied', 'acked', 'interviewing', 'offer', 'declined'];
const WORK_FROM_OPTIONS = ['home', 'hybrid', 'on-site'];

const JobRowGrid: FC<JobRowGridProps> = ({ job, onClickDelete, onClickArchive }) => {
  const [expanded, setExpanded] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [addingInterview, setAddingInterview] = useState(false);
  const [addingComment, setAddingComment] = useState(false);
  const [newInterview, setNewInterview] = useState('');
  const [newComment, setNewComment] = useState('');

  const { data: recruiters } = useGetRecruiters();
  const recruiter = recruiters?.find((r: Obj) => r.id === job.recruiter);
  const { mutate: updateJob } = useUpdateJob();

  function deleteJob() {
    console.log('job.id in deleteJob:::', job.id);
    onClickDelete(job.id, job.jobTitle);
  }

  function archiveJob() {
    console.log('job.id from archiveJob:::', job.id);
    onClickArchive(job.id, job.jobTitle);
  }

  function startEdit(field: string, value: string) {
    setEditingField(field);
    setEditingValue(value);
  }

  function saveEdit() {
    if (editingField) {
      updateJob({ ...job, [editingField]: editingValue });
      setEditingField(null);
    }
  }

  function cancelEdit() {
    setEditingField(null);
    setEditingValue('');
  }

  function renderEditable(field: string, value: string) {
    if (editingField === field) {
      return (
        <input
          autoFocus
          className="--inline-input"
          value={editingValue}
          onChange={e => setEditingValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={saveEdit}
        />
      );
    }
    return (
      <span className="--editable" onDoubleClick={() => startEdit(field, value)}>
        {value}
      </span>
    );
  }

  function submitNewInterview() {
    if (!newInterview.trim()) return;
    updateJob({ ...job, interviews: [...(job.interviews || []), newInterview.trim()] });
    setNewInterview('');
    setAddingInterview(false);
  }

  function removeInterview(index: number) {
    updateJob({ ...job, interviews: job.interviews.filter((_: string, i: number) => i !== index) });
  }

  function submitNewComment() {
    if (!newComment.trim()) return;
    updateJob({ ...job, comments: [...(job.comments || []), newComment.trim()] });
    setNewComment('');
    setAddingComment(false);
  }

  function removeComment(index: number) {
    updateJob({ ...job, comments: job.comments.filter((_: string, i: number) => i !== index) });
  }

  return (
    <div className="job-grid-row-wrapper">
      <div className="job-grid-row">
        <div className="--toggle-cell">
          <ActionButton
            iconClass={expanded ? "fas fa-caret-down" : "fas fa-caret-right"}
            color="blue"
            onClick={() => setExpanded(!expanded)}
          />
        </div>

        <div className="--truncate">{renderEditable('jobTitle', job.jobTitle)}</div>
        <div className="--truncate">{renderEditable('companyName', job.companyName)}</div>
        <div className="--truncate">
          {editingField === 'dateApplied'
            ? (
              <DatePicker
                selected={job.dateApplied ? parseISO(job.dateApplied) : null}
                onChange={(date: Date | null) => {
                  if (date) updateJob({ ...job, dateApplied: date.toISOString() });
                  cancelEdit();
                }}
                onClickOutside={cancelEdit}
                autoFocus
                open
              />
            ) : (
              <span className="--editable" onDoubleClick={() => startEdit('dateApplied', job.dateApplied)}>
                {job.dateApplied ? format(parseISO(job.dateApplied), 'MMM dd, yyyy') : ''}
              </span>
            )
          }
        </div>
        <div className="--truncate">
          {editingField === 'recruiter'
            ? (
              <select
                autoFocus
                className="--inline-select"
                value={editingValue}
                onChange={e => { updateJob({ ...job, recruiter: e.target.value }); cancelEdit(); }}
                onBlur={cancelEdit}
              >
                {recruiters?.map((r: Obj) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            ) : (
              <span className="--editable" onDoubleClick={() => startEdit('recruiter', job.recruiter)}>
                {recruiter?.name}
              </span>
            )
          }
        </div>

        <div>
          <select
            className="--inline-select"
            value={job.workFrom}
            onChange={e => updateJob({ ...job, workFrom: e.target.value })}
          >
            {WORK_FROM_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div>
          <select
            className="--inline-select"
            value={job.status}
            onChange={e => updateJob({ ...job, status: e.target.value })}
          >
            {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="--actions">
          <ActionButton
            iconClass="fas fa-archive"
            title="archive this job"
            color="blue"
            onClick={() => archiveJob()}
          />
          <ActionButton
            color="red"
            iconClass="fas fa-trash"
            onClick={() => deleteJob()}
          />
        </div>        
      </div>

      <div className={`--expansion-wrapper${expanded ? " is-open" : ""}`}>
        <div className="--expansion-inner">
          <div className="--expanded-content">
            <div className="--expanded-row">
              <div className="--address">
                <h4>Company Address</h4>
                <p>{renderEditable('companyAddress', job.companyAddress)}</p>
                <p>{renderEditable('companyCity', job.companyCity)}, {renderEditable('companyState', job.companyState)}</p>
              </div>

              <div className="--poc">
                <h4>Point of Contact</h4>
                <p>{renderEditable('pointOfContact', job.pointOfContact)}</p>
                <p>{renderEditable('pocTitle', job.pocTitle)}</p>
              </div>

              <div className="--section --interviews">
                <div className="--section-header">
                  <h4>Interviews</h4>
                  <ActionButton
                    iconClass="fas fa-plus"
                    color="green"
                    size="sm"
                    onClick={() => setAddingInterview(true)}
                  />
                </div>

                {job.interviews?.map((interview: string, i: number) => (
                  <div key={i} className="--section-item">
                    <ActionButton
                      text="x"
                      color="red"
                      onClick={() => removeInterview(i)}
                    />
                    <p>{interview}</p>
                  </div>
                ))}

                {addingInterview && (
                  <input
                    autoFocus
                    className="--add-input"
                    placeholder="New interview..."
                    value={newInterview}
                    onChange={e => setNewInterview(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') submitNewInterview();
                      if (e.key === 'Escape') { setAddingInterview(false); setNewInterview(''); }
                    }}
                    onBlur={() => { setAddingInterview(false); setNewInterview(''); }}
                  />
                )}
              </div>

              <div className="--section --comments">
                <div className="--section-header">
                  <h4>Comments</h4>
                  <ActionButton
                    iconClass="fas fa-plus"
                    color="green"
                    size="sm"
                    onClick={() => setAddingComment(true)}
                  />
                </div>

                {job.comments?.map((comment: string, i: number) => (
                  <div key={i} className="--section-item">
                    <ActionButton
                      text="x"
                      color="red"
                      onClick={() => removeComment(i)}
                    />
                    <p>{comment}</p>
                  </div>
                ))}
                
                {addingComment && (
                  <input
                    autoFocus
                    className="--add-input"
                    placeholder="New comment..."
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') submitNewComment();
                      if (e.key === 'Escape') { setAddingComment(false); setNewComment(''); }
                    }}
                    onBlur={() => { setAddingComment(false); setNewComment(''); }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default JobRowGrid;
