// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (let key in formData) {
        if (formData[key].length === 0) {
          // Create a copy of formData object
          const updatedFormData = { ...formData };
          // Remove the key and its corresponding value from the copied object
          delete updatedFormData[key];
          // Update the state with the new object
          setFormData(updatedFormData);
        }
      }
      dispatch(updateUserStart());
      //send request containing the form Data includes the new avatar uploaded if any
      const res = await fetch(`https://egyestateserver.onrender.com/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message, res.status);
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const dotIndex = file.name.lastIndexOf(".");
    const newFileName = currentUser._id + file.name.slice(dotIndex);

    // console.log("HIIIIII", newFileName);
    const fileName = newFileName;
    // console.log(file)
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //add the avatar with new photo to the form Data
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`https://egyestateserver.onrender.com/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message, res.status);
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("api/auth/sign-out");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message, res.status);
      }
      dispatch(signOutUserSuccess())
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto flex flex-col">
      <h1 className="text-3xl font-semibold text-center my-7"></h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover  cursor-pointer self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="self-center">
          {fileUploadError ? (
            <span className="text-red-700"></span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          {formData.password?.length >= 6 ? (
            <label className="text-green-600 font-bold self-end text-sm mb-1">
              ✔ STRONG PASS
            </label>
          ) : formData.password?.length > 0 ? (
            <label className="text-red-600 font-bold self-end text-sm mb-1">
              ❌ WEAK PASS
            </label>
          ) : (
            ""
          )}
          <input
            type="password"
            id="password"
            placeholder="password"
            className="border p-3 rounded-lg "
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>
      <div className="text-red-700 mt-5 p-0">
        {error ? (
          error
        ) : (
          <p className="text-green-700 ">
            {updateSuccess ? "User is updated successfully!" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
