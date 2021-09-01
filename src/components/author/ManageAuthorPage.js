import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";
import AuthorList from "./AuthorList";
import { loadAuthors, saveAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import { newAuthor } from "../../../tools/mockData";

function ManageAuthorPage(props) {
  const [author, setAuthor] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  function getCourseBySlug(authors, slug) {
    return authors.find((author) => author.authorSlug === slug);
  }

  const authors = useSelector((state) => state.authors);

  useEffect(() => {
    //asdas
    const slug = props.match.params.authorSlug;
    console.log("authorSlugis : ", slug || "no slug found");

    const author =
      slug && authors.length > 0 ? getCourseBySlug(authors, slug) : newAuthor;

    setAuthor(author);
    //sdsad
  }, []);

  const dispatch = useDispatch();

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
    console.log("Author to save is: ", author);
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);

    dispatch(saveAuthor(author))
      .then(() => {
        toast.success("Author Saved");
        props.history.push("/authors");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <div>
      {authors.length === 0 ? (
        <Spinner />
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

// AuthorsPage.propTypes = {
//   authors: PropTypes.array.isRequired,
//   history: PropTypes.array.isRequired,
// };

export default ManageAuthorPage;
