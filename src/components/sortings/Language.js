import React from "react";

function Language({ changeLanguage }) {
  return (
    <div className="languageConatiner">
      <form>
        <select onChange={(event) => changeLanguage(event.target.value)}>
          <option value="">Non selected</option>
          <option value="en-US">English</option>
          <option value="fr-FR">French</option>
          <option value="hi-IN">Hindi</option>
          <option value="de-DE">German</option>
        </select>
      </form>
    </div>
  );
}

export default Language;
