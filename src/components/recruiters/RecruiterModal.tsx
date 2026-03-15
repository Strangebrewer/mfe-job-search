import { FC, useState } from "react";
import { Modal, Button } from "@bka-stuff/mfe-utils";
import { useCreateRecruiter } from "../../hooks/recruiterHooks";

type RecruiterModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const RecruiterModal: FC<RecruiterModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [rating, setRating] = useState(1);

  const { mutate: createRecruiter } = useCreateRecruiter();

  function closeModal() {
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setRating(0);
    onClose();
  }

  function submit() {
    if (name && company && email) {
      createRecruiter({ name, company, email, phone, rating });
    }
  }

  return (
    <Modal isOpen={isOpen} close={closeModal}>
      <div>
        <form action="">
          <div>
            <label className="tw:block">name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="tw:block">company</label>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="tw:block">phone</label>
            <input
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="tw:block">email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="tw:block">rating</label>
            <select
              name="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((r: number) => {
                return <option key={r} value={r}>{r}</option>;
              })}
            </select>
          </div>

          <div>
            <Button variant="red" text="Cancel" onClick={closeModal} />
            <Button
              variant="blue"
              text="Save"
              onClick={submit}
              disabled={!name || !company || !email}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RecruiterModal;
