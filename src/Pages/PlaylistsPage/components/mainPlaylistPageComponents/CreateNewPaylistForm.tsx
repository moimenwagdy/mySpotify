import { Form, useActionData } from "react-router-dom";
const CreateNewPaylistForm: React.FC = () => {
  const data = useActionData();
  console.log(data);
  return (
    <Form method="post">
      <div>
        <input
          type="text"
          className="text-dark"
          name="playlistName"
          placeholder="playlistName"
        />
        <input
          type="text"
          className="text-dark"
          name="playlistDes"
          placeholder="playlistName"
        />
      </div>
      <button>Send</button>
    </Form>
  );
};

export default CreateNewPaylistForm;
