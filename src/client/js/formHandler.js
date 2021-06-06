const handleSubmit = async (event) => {
    
    event.preventDefault();
    const url = { url: document.getElementById('name').value };
    if (Client.is_URL_Valid(url.url)) {
        const response = await Client.postFormDataToserver('http://localhost:8082/test', url);
        // check the polarity
        const score_tag =
            response.score_tag === "P+"
                ? "STRONG POSITIVE"
                : response.score_tag === "P"
                    ? "POSITIVE"
                    : response.score_tag === "NEW"
                        ? "NEUTRAL"
                        : response.score_tag === "N"
                            ? "NEGATIVE"
                            : response.score_tag === "N+"
                                ? "STRONG NEGATIVE"
                                : response.score_tag === "NONE"
                                    ? "NO SENTIMENT"
                                    : "NO DEFINED SENTIMENT";

        document.getElementById('results').innerHTML = "Polarity: " + score_tag;
        document.getElementById('results').innerHTML += "<br>" + "Agreement: " + response.agreement;
        document.getElementById('results').innerHTML += "<br>" + "Subjectivity: " + response.subjectivity;
        document.getElementById('results').innerHTML += "<br>" + "Confidence: " + response.confidence;
        document.getElementById('results').innerHTML += "<br>" + "Irony: " + response.irony;
    } else {
        $('#Modal').modal("toggle");
        $('.closemodal').on("click", () => {
            $('#Modal').modal('hide');
        });

    }
};

export { handleSubmit };