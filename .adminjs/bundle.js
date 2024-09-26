(function (React) {
	'use strict';

	function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

	var React__default = /*#__PURE__*/_interopDefault(React);

	const CustomImage = props => {
	  return /*#__PURE__*/React__default.default.createElement("div", {
	    id: "custom-component"
	  }, /*#__PURE__*/React__default.default.createElement("img", {
	    src: props.record.params.img,
	    alt: props.record.params.title,
	    style: {
	      'object-fit': 'cover',
	      width: '250px',
	      height: '187px'
	    }
	  }));
	};

	const CustomTitle = props => {
	  return /*#__PURE__*/React__default.default.createElement("div", {
	    id: "custom-link"
	  }, /*#__PURE__*/React__default.default.createElement("span", null, props.record.params.title), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("a", {
	    href: props.record.params.link,
	    target: "_blank"
	  }, /*#__PURE__*/React__default.default.createElement("div", {
	    style: {
	      padding: '5px',
	      'background-color': 'darkgray',
	      color: 'white',
	      'border-radius': '5px',
	      'text-align': 'center'
	    }
	  }, /*#__PURE__*/React__default.default.createElement("span", null, "See announcement to https:"), /*#__PURE__*/React__default.default.createElement("span", null, "www.mobile.bg"))));
	};

	const ContentParser = () => {
	  const [brands, setBrands] = React.useState([]);
	  const [models, setModels] = React.useState([]);
	  const [selectedBrand, setSelectedBrand] = React.useState('');
	  const [selectedModel, setSelectedModel] = React.useState('');
	  const [url, setUrl] = React.useState('https://www.mobile.bg');
	  const [productionYearFrom, setProductionYearFrom] = React.useState('2017');
	  const [productionYearTo, setProductionYearTo] = React.useState('');
	  const [priceFrom, setPriceFrom] = React.useState('');
	  const [priceTo, setPriceTo] = React.useState('');
	  const [errors, setErrors] = React.useState({});
	  // const validate = () => {
	  // 	const newErrors = {}
	  // 	if (!selectedCategory) newErrors.selectedBrand = 'Category is required'
	  //
	  // 	return newErrors
	  // }
	  const handleSubmit = async event => {
	    console.log('event -> ', event);
	    event.preventDefault();
	    // const newErrors = validate()
	    // if (Object.keys(newErrors).length > 0) {
	    // 	setErrors(newErrors)
	    // 	return
	    // }
	    const data = {
	      url,
	      selectedBrand,
	      selectedModel,
	      productionYearFrom,
	      productionYearTo,
	      priceFrom,
	      priceTo
	    };
	    try {
	      const response = await fetch('http://localhost:8080/announcements/parsingContentByParams', {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(data)
	      });
	      if (response.ok) {
	        console.log('Data submitted successfully');
	      } else {
	        console.error('Failed to submit data');
	      }
	    } catch (error) {
	      console.error('Error:', error);
	    }
	  };

	  // Fetch brands on component mount
	  React.useEffect(() => {
	    fetch('/brand/models/options?option=brands').then(response => response.json()).then(data => {
	      setBrands(data.options);
	      console.log('data.options -> ', data.options);
	    }).catch(error => {
	      console.error('Error fetching brands:', error);
	    });
	  }, []);

	  // Fetch models when a brand is selected
	  React.useEffect(() => {
	    if (selectedBrand) {
	      fetch(`/brand/models/options?option=${selectedBrand}`).then(response => response.json()).then(data => {
	        setModels(data.options);
	        console.log('data.options -> ', data.options);
	      }).catch(error => {
	        console.error('Error fetching models:', error);
	      });
	    }
	  }, [selectedBrand]);
	  return /*#__PURE__*/React__default.default.createElement("div", {
	    className: "custom-page"
	  }, /*#__PURE__*/React__default.default.createElement("h1", null, "Parser form"), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("form", {
	    onSubmit: handleSubmit
	  }, /*#__PURE__*/React__default.default.createElement("div", {
	    className: "form-group"
	  }, /*#__PURE__*/React__default.default.createElement("label", {
	    htmlFor: "brand"
	  }, "Brand:"), /*#__PURE__*/React__default.default.createElement("select", {
	    id: "brand",
	    value: selectedBrand,
	    onChange: e => setSelectedBrand(e.target.value)
	  }, /*#__PURE__*/React__default.default.createElement("option", {
	    value: ""
	  }, "Select a brand"), brands.map(brand => /*#__PURE__*/React__default.default.createElement("option", {
	    key: brand,
	    value: brand
	  }, brand))), errors.selectedBrand && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.selectedBrand)), /*#__PURE__*/React__default.default.createElement("div", {
	    className: "form-group"
	  }, /*#__PURE__*/React__default.default.createElement("label", {
	    htmlFor: "model"
	  }, "Model:"), /*#__PURE__*/React__default.default.createElement("select", {
	    id: "model",
	    value: selectedModel,
	    onChange: e => setSelectedModel(e.target.value)
	  }, /*#__PURE__*/React__default.default.createElement("option", {
	    value: ""
	  }, "Select a model"), models.map(model => /*#__PURE__*/React__default.default.createElement("option", {
	    key: model,
	    value: model
	  }, model))), errors.selectedModel && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.selectedModel)), /*#__PURE__*/React__default.default.createElement("div", {
	    className: "form-group"
	  }, /*#__PURE__*/React__default.default.createElement("label", null, "Production Years (by default is 2017):"), /*#__PURE__*/React__default.default.createElement("select", {
	    value: productionYearFrom,
	    onChange: e => setProductionYearFrom(e.target.value)
	  }, /*#__PURE__*/React__default.default.createElement("option", {
	    value: "2017"
	  }, "Select year"), yearsFromAnyToCurrent().map((year, index) => /*#__PURE__*/React__default.default.createElement("option", {
	    key: index,
	    value: year
	  }, year))), errors.productionYearFrom && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.productionYearFrom), /*#__PURE__*/React__default.default.createElement("select", {
	    value: productionYearTo,
	    onChange: e => setProductionYearTo(e.target.value)
	  }, /*#__PURE__*/React__default.default.createElement("option", {
	    value: ""
	  }), yearsFromAnyToCurrent().map((year, index) => /*#__PURE__*/React__default.default.createElement("option", {
	    key: index,
	    value: year
	  }, year))), errors.productionYearTo && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.productionYearTo)), /*#__PURE__*/React__default.default.createElement("div", {
	    className: "form-group price-interval",
	    style: {
	      'margin-bottom': '15px'
	    }
	  }, /*#__PURE__*/React__default.default.createElement("label", null, "Price:"), /*#__PURE__*/React__default.default.createElement("div", {
	    className: "interval"
	  }, /*#__PURE__*/React__default.default.createElement("input", {
	    type: "number",
	    placeholder: "From",
	    value: priceFrom,
	    onChange: e => setPriceFrom(e.target.value)
	  }), errors.priceFrom && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.priceFrom), /*#__PURE__*/React__default.default.createElement("input", {
	    type: "number",
	    placeholder: "To",
	    value: priceTo,
	    onChange: e => setPriceTo(e.target.value)
	  }), errors.priceTo && /*#__PURE__*/React__default.default.createElement("span", {
	    className: "error"
	  }, errors.priceTo))), /*#__PURE__*/React__default.default.createElement("button", {
	    type: "submit"
	  }, "Run parser")));
	};
	function yearsFromAnyToCurrent(startYear = 2017) {
	  const currentYear = new Date().getFullYear();
	  const years = [];
	  for (let year = startYear; year <= currentYear; year++) {
	    years.push(year);
	  }
	  return years;
	}

	const SettingsPage = props => {
	  const handleSubmit = async e => {
	    e.preventDefault();
	    try {
	      const response = await fetch('http://localhost:8080/options/create', {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json'
	        },
	        body: JSON.stringify({})
	      });
	      console.log('Record saved:', response.data);
	    } catch (error) {
	      console.error('Error saving record:', error);
	    }
	  };
	  return /*#__PURE__*/React__default.default.createElement("div", {
	    id: "settings-page"
	  }, /*#__PURE__*/React__default.default.createElement("h2", null, /*#__PURE__*/React__default.default.createElement("span", null, "Settings")), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("button", {
	    type: "submit",
	    onClick: handleSubmit
	  }, "Init"));
	};

	AdminJS.UserComponents = {};
	AdminJS.UserComponents.CustomImage = CustomImage;
	AdminJS.UserComponents.CustomTitle = CustomTitle;
	AdminJS.UserComponents.ContentParserPage = ContentParser;
	AdminJS.UserComponents.SettingsPage = SettingsPage;

})(React);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvQ3VzdG9tSW1hZ2UuanN4IiwiLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL0N1c3RvbVRpdGxlLmpzeCIsIi4uL3NyYy9hcGkvYWRtaW4tanMvY29tcG9uZW50cy9Db250ZW50UGFyc2VyLmpzeCIsIi4uL3NyYy9hcGkvYWRtaW4tanMvY29tcG9uZW50cy9TZXR0aW5nc1BhZ2UuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXHJcblxyXG5jb25zdCBDdXN0b21JbWFnZSA9IChwcm9wcykgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGlkPVwiY3VzdG9tLWNvbXBvbmVudFwiPlxyXG5cdFx0XHQ8aW1nIHNyYz17cHJvcHMucmVjb3JkLnBhcmFtcy5pbWd9IGFsdD17cHJvcHMucmVjb3JkLnBhcmFtcy50aXRsZX0gc3R5bGU9e3tcclxuXHRcdFx0XHQnb2JqZWN0LWZpdCc6ICdjb3ZlcicsIHdpZHRoOiAnMjUwcHgnLCBoZWlnaHQ6ICcxODdweCdcclxuXHRcdFx0fX0gLz5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tSW1hZ2UiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcclxuXHJcbmNvbnN0IEN1c3RvbVRpdGxlID0gKHByb3BzKSA9PiB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgaWQ9XCJjdXN0b20tbGlua1wiPlxyXG5cdFx0XHQ8c3Bhbj57cHJvcHMucmVjb3JkLnBhcmFtcy50aXRsZX08L3NwYW4+PGJyLz48YnIvPlxyXG5cdFx0XHQ8YSBocmVmPXtwcm9wcy5yZWNvcmQucGFyYW1zLmxpbmt9IHRhcmdldD1cIl9ibGFua1wiID5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiAnNXB4JyxcclxuXHRcdFx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ2RhcmtncmF5JyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdFx0XHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnNXB4JyxcclxuXHRcdFx0XHRcdCd0ZXh0LWFsaWduJzogJ2NlbnRlcicsXHJcblx0XHRcdFx0fX0+XHJcblx0XHRcdFx0XHQ8c3Bhbj5TZWUgYW5ub3VuY2VtZW50IHRvIGh0dHBzOjwvc3Bhbj5cclxuXHRcdFx0XHRcdDxzcGFuPnd3dy5tb2JpbGUuYmc8L3NwYW4+XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdDwvYT5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tVGl0bGUiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCAgfSBmcm9tICdyZWFjdCdcclxuLy8gaW1wb3J0ICcuL3N0eWxlL3N0eWxlLmNzcydcclxuLy8gaW1wb3J0IHN0eWxlcyBmcm9tICcuL3N0eWxlL3N0eWxlLmNzcydcclxuXHJcbmNvbnN0IGNhdGVnb3JpZXMgPSBbXHJcblx0XCJNZXJjZWRlcy1CZW56XCIsXHJcblx0XCJCTVdcIixcclxuXHRcIkF1ZGlcIixcclxuXHRcIlZXXCIsXHJcblx0XCJUb3lvdGFcIixcclxuXHRcIk9wZWxcIixcclxuXHRcIlBldWdlb3RcIlxyXG5dXHJcbmNvbnN0IHR5cGVUcmFuc21pc3Npb24gPSB7XHJcblx0J21hbnVhbCc6ICfQoNGK0YfQvdCwJyxcclxuXHQnYXV0b21hdGljJzogJ9CQ0LLRgtC+0LzQsNGC0LjRh9C90LAnLFxyXG5cdCdzZW1pX2F1dG9tYXRpYyc6ICfQn9C+0LvRg9Cw0LLRgtC+0LzQsNGC0LjRh9C90LAnXHJcbn1cclxuXHJcbmNvbnN0IENvbnRlbnRQYXJzZXIgPSAoKSA9PiB7XHJcblx0Y29uc3QgW2JyYW5kcywgc2V0QnJhbmRzXSA9IHVzZVN0YXRlKFtdKVxyXG5cdGNvbnN0IFttb2RlbHMsIHNldE1vZGVsc10gPSB1c2VTdGF0ZShbXSlcclxuXHRjb25zdCBbc2VsZWN0ZWRCcmFuZCwgc2V0U2VsZWN0ZWRCcmFuZF0gPSB1c2VTdGF0ZSgnJylcclxuXHRjb25zdCBbc2VsZWN0ZWRNb2RlbCwgc2V0U2VsZWN0ZWRNb2RlbF0gPSB1c2VTdGF0ZSgnJylcclxuXHRjb25zdCBbdXJsLCBzZXRVcmxdID0gdXNlU3RhdGUoJ2h0dHBzOi8vd3d3Lm1vYmlsZS5iZycpXHJcblx0Y29uc3QgW3Byb2R1Y3Rpb25ZZWFyRnJvbSwgc2V0UHJvZHVjdGlvblllYXJGcm9tXSA9IHVzZVN0YXRlKCcyMDE3JylcclxuXHRjb25zdCBbcHJvZHVjdGlvblllYXJUbywgc2V0UHJvZHVjdGlvblllYXJUb10gPSB1c2VTdGF0ZSgnJylcclxuXHRjb25zdCBbcHJpY2VGcm9tLCBzZXRQcmljZUZyb21dID0gdXNlU3RhdGUoJycpXHJcblx0Y29uc3QgW3ByaWNlVG8sIHNldFByaWNlVG9dID0gdXNlU3RhdGUoJycpXHJcblx0Y29uc3QgW2Vycm9ycywgc2V0RXJyb3JzXSA9IHVzZVN0YXRlKHt9KVxyXG5cdC8vIGNvbnN0IHZhbGlkYXRlID0gKCkgPT4ge1xyXG5cdC8vIFx0Y29uc3QgbmV3RXJyb3JzID0ge31cclxuXHQvLyBcdGlmICghc2VsZWN0ZWRDYXRlZ29yeSkgbmV3RXJyb3JzLnNlbGVjdGVkQnJhbmQgPSAnQ2F0ZWdvcnkgaXMgcmVxdWlyZWQnXHJcblx0Ly9cclxuXHQvLyBcdHJldHVybiBuZXdFcnJvcnNcclxuXHQvLyB9XHJcblx0Y29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgZXZlbnQgPT4ge1xyXG5cdFx0Y29uc29sZS5sb2coJ2V2ZW50IC0+ICcsIGV2ZW50KVxyXG5cclxuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHRcdC8vIGNvbnN0IG5ld0Vycm9ycyA9IHZhbGlkYXRlKClcclxuXHRcdC8vIGlmIChPYmplY3Qua2V5cyhuZXdFcnJvcnMpLmxlbmd0aCA+IDApIHtcclxuXHRcdC8vIFx0c2V0RXJyb3JzKG5ld0Vycm9ycylcclxuXHRcdC8vIFx0cmV0dXJuXHJcblx0XHQvLyB9XHJcblx0XHRjb25zdCBkYXRhID0ge1xyXG5cdFx0XHR1cmwsXHJcblx0XHRcdHNlbGVjdGVkQnJhbmQsXHJcblx0XHRcdHNlbGVjdGVkTW9kZWwsXHJcblx0XHRcdHByb2R1Y3Rpb25ZZWFyRnJvbSxcclxuXHRcdFx0cHJvZHVjdGlvblllYXJUbyxcclxuXHRcdFx0cHJpY2VGcm9tLFxyXG5cdFx0XHRwcmljZVRvLFxyXG5cdFx0fVxyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hbm5vdW5jZW1lbnRzL3BhcnNpbmdDb250ZW50QnlQYXJhbXMnLCB7XHJcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ0RhdGEgc3VibWl0dGVkIHN1Y2Nlc3NmdWxseScpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRmFpbGVkIHRvIHN1Ym1pdCBkYXRhJylcclxuXHRcdFx0fVxyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBGZXRjaCBicmFuZHMgb24gY29tcG9uZW50IG1vdW50XHJcblx0dXNlRWZmZWN0KCgpID0+IHtcclxuXHRcdGZldGNoKCcvYnJhbmQvbW9kZWxzL29wdGlvbnM/b3B0aW9uPWJyYW5kcycpXHJcblx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuXHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0c2V0QnJhbmRzKGRhdGEub3B0aW9ucylcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2RhdGEub3B0aW9ucyAtPiAnLCBkYXRhLm9wdGlvbnMpXHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaChlcnJvciA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYnJhbmRzOicsIGVycm9yKVxyXG5cdFx0XHR9KVxyXG5cdH0sIFtdKVxyXG5cclxuXHQvLyBGZXRjaCBtb2RlbHMgd2hlbiBhIGJyYW5kIGlzIHNlbGVjdGVkXHJcblx0dXNlRWZmZWN0KCgpID0+IHtcclxuXHRcdGlmIChzZWxlY3RlZEJyYW5kKSB7XHJcblx0XHRcdGZldGNoKGAvYnJhbmQvbW9kZWxzL29wdGlvbnM/b3B0aW9uPSR7c2VsZWN0ZWRCcmFuZH1gKVxyXG5cdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuXHRcdFx0XHQudGhlbihkYXRhID0+IHtcclxuXHRcdFx0XHRcdHNldE1vZGVscyhkYXRhLm9wdGlvbnMpXHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coJ2RhdGEub3B0aW9ucyAtPiAnLCBkYXRhLm9wdGlvbnMpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgbW9kZWxzOicsIGVycm9yKVxyXG5cdFx0XHRcdH0pXHJcblx0XHR9XHJcblx0fSwgW3NlbGVjdGVkQnJhbmRdKVxyXG5cclxuXHRyZXR1cm4gKFxyXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJjdXN0b20tcGFnZVwiPlxyXG5cdFx0XHQ8aDE+UGFyc2VyIGZvcm08L2gxPjxici8+XHJcblx0XHRcdDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0PGxhYmVsIGh0bWxGb3I9XCJicmFuZFwiPkJyYW5kOjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8c2VsZWN0XHJcblx0XHRcdFx0XHRcdGlkPVwiYnJhbmRcIlxyXG5cdFx0XHRcdFx0XHR2YWx1ZT17c2VsZWN0ZWRCcmFuZH1cclxuXHRcdFx0XHRcdFx0b25DaGFuZ2U9eyhlKSA9PiBzZXRTZWxlY3RlZEJyYW5kKGUudGFyZ2V0LnZhbHVlKX1cclxuXHRcdFx0XHRcdD5cclxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhIGJyYW5kPC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdHticmFuZHMubWFwKGJyYW5kID0+IChcclxuXHRcdFx0XHRcdFx0XHQ8b3B0aW9uIGtleT17YnJhbmR9IHZhbHVlPXticmFuZH0+XHJcblx0XHRcdFx0XHRcdFx0XHR7YnJhbmR9XHJcblx0XHRcdFx0XHRcdFx0PC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9zZWxlY3Q+XHJcblx0XHRcdFx0XHR7ZXJyb3JzLnNlbGVjdGVkQnJhbmQgJiYgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57ZXJyb3JzLnNlbGVjdGVkQnJhbmR9PC9zcGFuPn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0XHRcdDxsYWJlbCBodG1sRm9yPVwibW9kZWxcIj5Nb2RlbDo8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PHNlbGVjdFxyXG5cdFx0XHRcdFx0XHRpZD1cIm1vZGVsXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3NlbGVjdGVkTW9kZWx9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRNb2RlbChlLnRhcmdldC52YWx1ZSl9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYSBtb2RlbDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHR7bW9kZWxzLm1hcChtb2RlbCA9PiAoXHJcblx0XHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e21vZGVsfSB2YWx1ZT17bW9kZWx9PlxyXG5cdFx0XHRcdFx0XHRcdFx0e21vZGVsfVxyXG5cdFx0XHRcdFx0XHRcdDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdFx0e2Vycm9ycy5zZWxlY3RlZE1vZGVsICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5zZWxlY3RlZE1vZGVsfTwvc3Bhbj59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHQ8bGFiZWw+UHJvZHVjdGlvbiBZZWFycyAoYnkgZGVmYXVsdCBpcyAyMDE3KTo8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PHNlbGVjdCB2YWx1ZT17cHJvZHVjdGlvblllYXJGcm9tfSBvbkNoYW5nZT17KGUpID0+IHNldFByb2R1Y3Rpb25ZZWFyRnJvbShlLnRhcmdldC52YWx1ZSl9PlxyXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiMjAxN1wiPlNlbGVjdCB5ZWFyPC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdHt5ZWFyc0Zyb21BbnlUb0N1cnJlbnQoKS5tYXAoKHllYXIsIGluZGV4KSA9PiAoXHJcblx0XHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17eWVhcn0+e3llYXJ9PC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9zZWxlY3Q+XHJcblx0XHRcdFx0XHR7Lyo8aW5wdXQgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiRnJvbVwiIHZhbHVlPXtwcm9kdWN0aW9uWWVhckZyb219IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJvZHVjdGlvblllYXJGcm9tKGUudGFyZ2V0LnZhbHVlKX0gLz4qL31cclxuXHRcdFx0XHRcdHtlcnJvcnMucHJvZHVjdGlvblllYXJGcm9tICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5wcm9kdWN0aW9uWWVhckZyb219PC9zcGFuPn1cclxuXHRcdFx0XHRcdDxzZWxlY3QgdmFsdWU9e3Byb2R1Y3Rpb25ZZWFyVG99IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJvZHVjdGlvblllYXJUbyhlLnRhcmdldC52YWx1ZSl9PlxyXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiXCI+PC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdHt5ZWFyc0Zyb21BbnlUb0N1cnJlbnQoKS5tYXAoKHllYXIsIGluZGV4KSA9PiAoXHJcblx0XHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e2luZGV4fSB2YWx1ZT17eWVhcn0+e3llYXJ9PC9vcHRpb24+XHJcblx0XHRcdFx0XHRcdCkpfVxyXG5cdFx0XHRcdFx0PC9zZWxlY3Q+XHJcblx0XHRcdFx0XHR7Lyo8aW5wdXQgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiVG9cIiB2YWx1ZT17cHJvZHVjdGlvblllYXJUb30qL31cclxuXHRcdFx0XHRcdHsvKiAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFByb2R1Y3Rpb25ZZWFyVG8oZS50YXJnZXQudmFsdWUpfS8+Ki99XHJcblx0XHRcdFx0XHR7ZXJyb3JzLnByb2R1Y3Rpb25ZZWFyVG8gJiYgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57ZXJyb3JzLnByb2R1Y3Rpb25ZZWFyVG99PC9zcGFuPn1cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcHJpY2UtaW50ZXJ2YWxcIiBzdHlsZT17eydtYXJnaW4tYm90dG9tJzogJzE1cHgnfX0+XHJcblx0XHRcdFx0XHQ8bGFiZWw+UHJpY2U6PC9sYWJlbD5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJ2YWxcIj5cclxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkZyb21cIiB2YWx1ZT17cHJpY2VGcm9tfSBvbkNoYW5nZT17KGUpID0+IHNldFByaWNlRnJvbShlLnRhcmdldC52YWx1ZSl9Lz5cclxuXHRcdFx0XHRcdFx0e2Vycm9ycy5wcmljZUZyb20gJiYgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57ZXJyb3JzLnByaWNlRnJvbX08L3NwYW4+fVxyXG5cdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cIm51bWJlclwiIHBsYWNlaG9sZGVyPVwiVG9cIiB2YWx1ZT17cHJpY2VUb30gb25DaGFuZ2U9eyhlKSA9PiBzZXRQcmljZVRvKGUudGFyZ2V0LnZhbHVlKX0vPlxyXG5cdFx0XHRcdFx0XHR7ZXJyb3JzLnByaWNlVG8gJiYgPHNwYW4gY2xhc3NOYW1lPVwiZXJyb3JcIj57ZXJyb3JzLnByaWNlVG99PC9zcGFuPn1cclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5SdW4gcGFyc2VyPC9idXR0b24+XHJcblx0XHRcdDwvZm9ybT5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuZnVuY3Rpb24geWVhcnNGcm9tQW55VG9DdXJyZW50KHN0YXJ0WWVhciA9IDIwMTcpIHtcclxuXHRjb25zdCBjdXJyZW50WWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKVxyXG5cdGNvbnN0IHllYXJzID0gW11cclxuXHJcblx0Zm9yIChsZXQgeWVhciA9IHN0YXJ0WWVhcjsgeWVhciA8PSBjdXJyZW50WWVhcjsgeWVhcisrKSB7XHJcblx0XHR5ZWFycy5wdXNoKHllYXIpXHJcblx0fVxyXG5cclxuXHRyZXR1cm4geWVhcnNcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29udGVudFBhcnNlclxyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcclxuXHJcbmNvbnN0IFNldHRpbmdzUGFnZSA9IChwcm9wcykgPT4ge1xyXG5cdGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcblx0XHRlLnByZXZlbnREZWZhdWx0KClcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9vcHRpb25zL2NyZWF0ZScsIHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoe30pLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRjb25zb2xlLmxvZygnUmVjb3JkIHNhdmVkOicsIHJlc3BvbnNlLmRhdGEpXHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvciBzYXZpbmcgcmVjb3JkOicsIGVycm9yKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgaWQ9XCJzZXR0aW5ncy1wYWdlXCI+XHJcblx0XHRcdDxoMj48c3Bhbj5TZXR0aW5nczwvc3Bhbj48L2gyPjxici8+XHJcblx0XHRcdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0+SW5pdDwvYnV0dG9uPlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXR0aW5nc1BhZ2UiLCJBZG1pbkpTLlVzZXJDb21wb25lbnRzID0ge31cbmltcG9ydCBDdXN0b21JbWFnZSBmcm9tICcuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvQ3VzdG9tSW1hZ2UnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbUltYWdlID0gQ3VzdG9tSW1hZ2VcbmltcG9ydCBDdXN0b21UaXRsZSBmcm9tICcuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvQ3VzdG9tVGl0bGUnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkN1c3RvbVRpdGxlID0gQ3VzdG9tVGl0bGVcbmltcG9ydCBDb250ZW50UGFyc2VyUGFnZSBmcm9tICcuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvQ29udGVudFBhcnNlcidcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuQ29udGVudFBhcnNlclBhZ2UgPSBDb250ZW50UGFyc2VyUGFnZVxuaW1wb3J0IFNldHRpbmdzUGFnZSBmcm9tICcuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvU2V0dGluZ3NQYWdlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5TZXR0aW5nc1BhZ2UgPSBTZXR0aW5nc1BhZ2UiXSwibmFtZXMiOlsiQ3VzdG9tSW1hZ2UiLCJwcm9wcyIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImlkIiwic3JjIiwicmVjb3JkIiwicGFyYW1zIiwiaW1nIiwiYWx0IiwidGl0bGUiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiQ3VzdG9tVGl0bGUiLCJocmVmIiwibGluayIsInRhcmdldCIsInBhZGRpbmciLCJjb2xvciIsIkNvbnRlbnRQYXJzZXIiLCJicmFuZHMiLCJzZXRCcmFuZHMiLCJ1c2VTdGF0ZSIsIm1vZGVscyIsInNldE1vZGVscyIsInNlbGVjdGVkQnJhbmQiLCJzZXRTZWxlY3RlZEJyYW5kIiwic2VsZWN0ZWRNb2RlbCIsInNldFNlbGVjdGVkTW9kZWwiLCJ1cmwiLCJzZXRVcmwiLCJwcm9kdWN0aW9uWWVhckZyb20iLCJzZXRQcm9kdWN0aW9uWWVhckZyb20iLCJwcm9kdWN0aW9uWWVhclRvIiwic2V0UHJvZHVjdGlvblllYXJUbyIsInByaWNlRnJvbSIsInNldFByaWNlRnJvbSIsInByaWNlVG8iLCJzZXRQcmljZVRvIiwiZXJyb3JzIiwic2V0RXJyb3JzIiwiaGFuZGxlU3VibWl0IiwiZXZlbnQiLCJjb25zb2xlIiwibG9nIiwicHJldmVudERlZmF1bHQiLCJkYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwiZXJyb3IiLCJ1c2VFZmZlY3QiLCJ0aGVuIiwianNvbiIsIm9wdGlvbnMiLCJjYXRjaCIsImNsYXNzTmFtZSIsIm9uU3VibWl0IiwiaHRtbEZvciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwibWFwIiwiYnJhbmQiLCJrZXkiLCJtb2RlbCIsInllYXJzRnJvbUFueVRvQ3VycmVudCIsInllYXIiLCJpbmRleCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInN0YXJ0WWVhciIsImN1cnJlbnRZZWFyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwieWVhcnMiLCJwdXNoIiwiU2V0dGluZ3NQYWdlIiwib25DbGljayIsIkFkbWluSlMiLCJVc2VyQ29tcG9uZW50cyIsIkNvbnRlbnRQYXJzZXJQYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0NBSUEsTUFBTUEsV0FBVyxHQUFJQyxLQUFLLElBQUs7R0FDOUIsb0JBQ0NDLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7Q0FBS0MsSUFBQUEsRUFBRSxFQUFDLGtCQUFBO0lBQ1BGLGVBQUFBLHNCQUFBLENBQUFDLGFBQUEsQ0FBQSxLQUFBLEVBQUE7Q0FBS0UsSUFBQUEsR0FBRyxFQUFFSixLQUFL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
