import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import { newAuthor } from "../../../tools/mockData";

function ManageAuthorPage(props) {
  const [author, setAuthor] = useState(newAuthor);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function getAuthorBySlug(authors, slug) {
    return authors.find((author) => author.authorSlug === slug);
  }

  const authors = useSelector((state) => state.authors);
  const loading = useSelector((state) => state.apiCallsInProgress > 0);

  const dispatch = useDispatch();

  function loadAuthorsHandle() {
    dispatch(loadAuthors()).catch((error) => {
      alert("Loading authors failed " + error);
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const slug = props.match.params.authorSlug;

    // console.log("authorSlug is : ", slug || "no slug found");
    // console.log("authors are : ", authors || "no authors found");

    if (authors.length === 0 && slug) {
      console.log("you are in");
      loadAuthorsHandle();
    } else {
      const author =
        slug && authors.length > 0 ? getAuthorBySlug(authors, slug) : newAuthor;
      // console.log("new author is : ", author || "no authors found");

      if (!author) return;
      setAuthor(author);
    }
  }, [authors.length]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAuthor((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { name } = author;
    const errors = {};

    if (!name) errors.title = "Author Name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    // console.log("Author to save is: ", author);
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);

    dispatch(saveAuthor(author))
      .then(() => {
        toast.success("Author Saved");
        // eslint-disable-next-line react/prop-types
        props.history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <AuthorForm
            author={author}
            onChange={handleChange}
            onSave={handleSave}
            errors={errors}
            saving={saving}
          />
        </>
      )}
    </div>
  );
}

export default ManageAuthorPage;
