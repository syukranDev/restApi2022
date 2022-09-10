function prepareResponse(status, code, text, data){
	return({
		statusCode: status,
		code: code,
		text: text,
		data: data
	})
};

module.exports = {
    prepareResponse : prepareResponse
 }