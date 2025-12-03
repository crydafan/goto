async function shortenLink() {
  const value = document.getElementById("urlInput").value.trim();

  if (!value) {
    alert("// error: url required");
    return;
  }

  let shortLink = "";

  try {
    const url = new URL(value);

    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url.toString() }),
    });

    if (!response.ok) {
      alert("// error: failed to shorten url");
      return;
    }

    const result = await response.json();
    shortLink = `${window.location.origin}/${result.short}`;
  } catch {
    alert("// error: invalid url format");
    return;
  }

  const resultDiv = document.getElementById("result");
  const shortLinkElement = document.getElementById("shortLink");

  shortLinkElement.textContent = shortLink;
  shortLinkElement.href = shortLink;
  resultDiv.classList.add("show");
}

function copyLink() {
  const shortLink = document.getElementById("shortLink").textContent;

  navigator.clipboard.writeText(shortLink).then(() => {
    const btn = document.getElementById("copyButton");

    btn.textContent = "copied!";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.textContent = "copy";
      btn.classList.remove("copied");
    }, 2000);
  });
}

document.getElementById("shortenButton").addEventListener("click", () => {
  shortenLink();
});

document.getElementById("copyButton").addEventListener("click", () => {
  copyLink();
});

document.getElementById("urlInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    shortenLink();
  }
});
