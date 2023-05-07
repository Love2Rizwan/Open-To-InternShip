import styles from "../styles/Home.module.css";
import sectionStyles from "./rightSection.module.css";
import leftSectionStyles from "./leftSection.module.css";
import { useState, useEffect } from "react";
import { scaleFactor, placementInterestAip } from "../utils/constants";

function maskMail(email) {
  // Function to mask the email address
  if (typeof email !== "string") return email;

  const [name, domain] = email.split("@");
  const maskedName = `${name.slice(0, name.length / 2)}${"*".repeat(
    name.length / 2
  )}`;
  return maskedName + (domain ? "@" : "") + (domain || "");
}

const brandNames = [
  // Array of brand names and their corresponding images
  {
    name: "Practo",
    image: "",
  },
  {
    name: "Walmart",
    image: "",
  },
  {
    name: "Amazon",
    image: "",
  },
  {
    name: "BigBasket",
    image: "",
  },
  {
    name: "OYO",
    image: "",
  },
  {
    name: "Meesho",
    image: "",
  },
  {
    name: "Razorpay",
    image: "",
  },
  {
    name: "Netflix",
    image: "",
  },
  {
    name: "Twitter",
    image: "",
  },
];

const Spacer = ({ width = 0, height = 0 }) => <div style={{ width, height }} />;

export default function RightSection({
  collegeDetails,
  refreshCollegeDetails,
}) {
  // The main RightSection component receiving props
  const [internIntention, setInternIntention] = useState(1); // State variable for intern intention (0: Apply for internship, 1: Hire Software Interns)
  const [applyForInternFormValues, setApplyForInternFormValues] = useState({}); // State variable for form values when applying for an internship
  const [hireForInternFormValues, setHireForInternFormValues] = useState({}); // State variable for form values when hiring interns
  const [isLoading, setIsLoading] = useState(false); // State variable for loading status

  const { interns: interests, name: collegeName, fullName } = collegeDetails; // Destructuring collegeDetails object

  const renderApplyInternForm = [
    // Form fields for applying for an internship
    {
      placeholder: "Name",
      type: "text",
      id: "name",
      handleOnChange,
    },
    {
      placeholder: "Email Address",
      type: "email",
      id: "email",
      handleOnChange,
    },
    {
      placeholder: "WhatsApp No.",
      type: "number",
      id: "mobile",
      maxlength: 10,
      handleOnChange,
    },
    {
      placeholder: "Resume upload",
      type: "file",
      id: "cv",
      handleOnChange: handleOnChangeFile,
    },
  ];

  const renderHireInternForm = [
    // Form fields for hiring interns
    {
      placeholder: "Company Name",
      type: "text",
      id: "name",
      handleOnChange,
    },
    {
      placeholder: "Location",
      type: "text",
      id: "location",
      handleOnChange,
    },
    {
      placeholder: "Phone No.",
      type: "number",
      id: "mobile",
      maxlength: 10,
      handleOnChange,
    },
    {
      placeholder: "Email Address",
      type: "email",
      id: "email",
      handleOnChange,
    },
  ];

  const formDataToRender =
    internIntention === 0 ? renderApplyInternForm : renderHireInternForm; // Selecting the appropriate form fields based on internIntention
  const setForm =
    internIntention === 0
      ? setApplyForInternFormValues
      : setHireForInternFormValues; // Selecting the appropriate form values setter based on internIntention
  const filledForm =
    internIntention === 0 ? applyForInternFormValues : hireForInternFormValues; // Selecting the appropriate form values based on internIntention

  function getIntroText() {
    // Function to get the introductory text based on internIntention
    if (internIntention === 0)
      return "Join as a Software Developer Intern in a top tier company. Register Now.";

    return `Looking to hire interns from ${fullName}? Register Now.`;
  }

  function onClickInternIntention(e) {
    // Function to handle the click event on intern intention buttons
    if (e.target.value == undefined || e.target.value === internIntention)
      return;

    setInternIntention(Number(e.target.value));
  }

  function getSelectedDivClassName() {
    // Function to get the class name for the selected intern intention button
    if (internIntention === 0)
      return `${sectionStyles.selectedToggleBtn} ${sectionStyles.selectedToggleBtnLeft}`;

    return `${sectionStyles.selectedToggleBtn} ${sectionStyles.selectedToggleBtnRight}`;
  }

  function getInternIntentionClassName(value) {
    // Function to get the class name for intern intention buttons
    const isSelected = internIntention === value;

    if (isSelected)
      return `${sectionStyles.toggleBtn} ${sectionStyles.whiteText}`;

    return sectionStyles.toggleBtn;
  }

  function handleOnChange(id, e) {
    // Function to handle the change event for form inputs
    setForm({
      ...filledForm,
      [id]: e.target.value,
    });
  }

  function handleOnChangeFile(id, e) {
    // Function to handle the change event for file input (resume upload)
    const file = e.target.files[0];

    setApplyForInternFormValues({
      ...applyForInternFormValues,
      [id]: file,
      cvName: file.name,
    });
  }

  async function submitInternForm() {
    // Function to submit the intern form
    try {
      setIsLoading(true);
      // Check if all fields are filled
      if (
        Object.keys(filledForm).length < 4 ||
        Object.values(filledForm).filter((item) => !item).length
      ) {
        alert("All fields are mandatory");
        return;
      }

      if (internIntention === 1) {
        // If the intention is to hire interns
        alert("your request has been submitted successfully");
        setHireForInternFormValues({});
        return;
      }
      // Create a FormData object to send the form data
      const formData = new FormData();
      Object.keys(applyForInternFormValues).forEach((key) =>
        formData.append(key, applyForInternFormValues[key])
      );
      formData.append("collegeName", collegeName);
      // Send a POST request to the placementInterestAip endpoint with the form data
      const response = await fetch(placementInterestAip, {
        method: "POST",
        body: formData,
      });
      const val = await response.json();
      if (val.status === false)
        throw new Error(
          val.msg || "An error occurred while submitting the form."
        );
      // Display success message and reset form values
      alert(
        "Your request has been submitted successfully. You will be contacted soon"
      );
      setApplyForInternFormValues({});
      refreshCollegeDetails();
    } catch (error) {
      console.log("post placementInterestAip ==>", error.message);
      alert(
        error.message ||
          "An error occurred while submitting the form. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={`${styles.section} ${sectionStyles.rightSection}`}>
      {/* {isLoading && <div className={styles.loader}/>} */}

      <Spacer height={"2.5rem"} />

      <div
        onClick={onClickInternIntention}
        className={sectionStyles.internToggleBtnContainer}
      >
        <div className={getSelectedDivClassName()} />
        <button value={0} className={getInternIntentionClassName(0)}>
          Apply for internship
        </button>
        <button value={1} className={getInternIntentionClassName(1)}>
          Hire Software Interns
        </button>
      </div>

      <Spacer height={"2.5rem"} />

      {internIntention === 1 &&
        Array.isArray(interests) &&
        !!interests.length && (
          <div className={sectionStyles.interestContainer}>
            <div className={sectionStyles.interestRow} key={0}>
              <span
                className={sectionStyles.rowItemHeading}
                style={{ flex: 0.75 }}
              >
                S. no
              </span>
              <span
                className={sectionStyles.rowItemHeading}
                style={{ flex: 1 }}
              >
                Intern Name
              </span>
              <span
                className={sectionStyles.rowItemHeading}
                style={{ flex: 1 }}
              >
                Email Address
              </span>
            </div>
            {interests.map((interest, index) => (
              <div className={sectionStyles.interestRow} key={interest._id}>
                <span
                  style={{ flex: 0.75, fontSize: ".87rem", fontWeight: "700" }}
                >{`${index + 1}. `}</span>
                <span
                  style={{ flex: 1, fontSize: ".87rem", fontWeight: "700" }}
                >
                  {interest.name}
                </span>
                <span style={{ flex: 1, fontSize: ".87rem" }}>
                  {maskMail(interest.email)}
                </span>
              </div>
            ))}
          </div>
        )}

      <Spacer height={"1.5rem"} />

      <p className={sectionStyles.intro_text}>{getIntroText()}</p>

      <Spacer height={"1.5rem"} />

      <div className={sectionStyles.inputContainer}>
        {formDataToRender.map(({ id, type, handleOnChange, placeholder }) => (
          <div key={id} className={sectionStyles.formElementContainer}>
            <label
              htmlFor={id}
              className={sectionStyles.labelBox}
              style={{
                color: applyForInternFormValues["cvName"] ? "black" : "#caccdd",
              }}
            >
              {id === "cv" &&
                (applyForInternFormValues["cvName"] || placeholder)}
            </label>
            <input
              onChange={(e) => handleOnChange(id, e)}
              // accept="application/pdf, application/doc"
              value={filledForm[id === "cv" ? "" : id] || ""} // because file type value is read-only, it is an uncontrolled component
              id={id}
              type={type}
              required
              autoComplete="on"
              className={sectionStyles.inputBox}
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>

      <Spacer height={"1.25rem"} />

      <button
        disabled={isLoading}
        className={sectionStyles.applyBtn}
        onClick={submitInternForm}
      >
        Apply Now
      </button>

      {internIntention === 0 && (
        <>
          <Spacer height={"4rem"} />

          <p>More than 200+ Brands trust us</p>

          <Spacer height={"1rem"} />
          <img
            // src="/svgs/companies.svg"
            src={require("../public/company-image.png")}
            alt="companies"
            width={750 * scaleFactor}
            height={40 * scaleFactor}
          />
        </>
      )}

      <Spacer height={"2rem"} />

      <small
        className={`${leftSectionStyles.copyrightText} ${sectionStyles.copyrightText}`}
      >
        Powered by <span style={{ color: "#FF2231" }}>Mohd Rizwan</span>
      </small>

      <Spacer height={"2rem"} />
    </section>
  );
}
