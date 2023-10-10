"use client";
import { FormEvent, useState } from "react";
import { URL } from "url";

const isValidAmazonProductLink = (url: string) => {
 try {
  const parsedUrl = new URL(url);
  const hostname = parsedUrl.hostname;

  if (hostname.includes("amazon.") || hostname.endsWith("amazon")) {
   return true;
  }
 } catch (error) {
  return false;
 } finally {
 }
};

const SeachBar = () => {
 const [promptSearch, setpromptSearch] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const isValidLink = isValidAmazonProductLink(promptSearch);
  if (!isValidLink) return alert("Please Provide a valid Amazon Product URL");
  try {
   setIsLoading(true);
  } catch (error) {
   console.log(error);
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <form className="flex flex-wrap gap-0 mt-12" onSubmit={handleSubmit}>
   <input
    type="text"
    className="searchbar-input"
    value={promptSearch}
    onChange={(e) => setpromptSearch(e.target.value)}
    placeholder="Search product link"
   />
   <button
    className="searchbar-btn"
    type="submit"
    disabled={promptSearch === ""}>
    {isLoading ? "Searching" : "Search"}
   </button>
  </form>
 );
};

export default SeachBar;
