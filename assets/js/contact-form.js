(function () {
  "use strict";

  const form = document.querySelector(".pricing__form");
  if (!form) {
    return;
  }

  const status = document.querySelector(".form__status");
  const submitButton = form.querySelector(".form__submit");
  const endpoint = form.dataset.endpoint;

  function setStatus(message, state) {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.dataset.state = state;
  }

  function reportError(message, error) {
    setStatus(message, "error");
    if (error) {
      console.error("[contact-form]", error);
    }
  }

  if (!endpoint) {
    reportError(
      "This form is not connected to a mail service yet. Please email info@ajayla.com instead.",
      new Error("Missing data-endpoint on .pricing__form")
    );
    if (submitButton) {
      submitButton.disabled = true;
    }
    return;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      setStatus("Please fill in every field before submitting.", "error");
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }
    setStatus("Sending your request…", "pending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error(
          "Request failed with status " + response.status + " " + response.statusText
        );
      }

      form.reset();
      setStatus("Thanks! We received your request and will get back to you soon.", "success");
    } catch (error) {
      reportError(
        "We could not send your request. Please try again or email info@ajayla.com.",
        error
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
})();
