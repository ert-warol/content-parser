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
	  }, /*#__PURE__*/React__default.default.createElement("span", null, "See announcement to https:"), /*#__PURE__*/React__default.default.createElement("br", null), /*#__PURE__*/React__default.default.createElement("span", null, "www.mobile.bg"))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYXBpL2FkbWluLWpzL2NvbXBvbmVudHMvQ3VzdG9tSW1hZ2UuanN4IiwiLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL0N1c3RvbVRpdGxlLmpzeCIsIi4uL3NyYy9hcGkvYWRtaW4tanMvY29tcG9uZW50cy9Db250ZW50UGFyc2VyLmpzeCIsIi4uL3NyYy9hcGkvYWRtaW4tanMvY29tcG9uZW50cy9TZXR0aW5nc1BhZ2UuanN4IiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXHJcblxyXG5jb25zdCBDdXN0b21JbWFnZSA9IChwcm9wcykgPT4ge1xyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGlkPVwiY3VzdG9tLWNvbXBvbmVudFwiPlxyXG5cdFx0XHQ8aW1nIHNyYz17cHJvcHMucmVjb3JkLnBhcmFtcy5pbWd9IGFsdD17cHJvcHMucmVjb3JkLnBhcmFtcy50aXRsZX0gc3R5bGU9e3tcclxuXHRcdFx0XHQnb2JqZWN0LWZpdCc6ICdjb3ZlcicsIHdpZHRoOiAnMjUwcHgnLCBoZWlnaHQ6ICcxODdweCdcclxuXHRcdFx0fX0gLz5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ3VzdG9tSW1hZ2UiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IFNob3dQcm9wZXJ0eVByb3BzIH0gZnJvbSAnYWRtaW5qcydcclxuaW1wb3J0IHsgQm94IH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSdcclxuXHJcbmNvbnN0IEN1c3RvbVRpdGxlID0gKHByb3BzKSA9PiB7XHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgaWQ9XCJjdXN0b20tbGlua1wiPlxyXG5cdFx0XHQ8c3Bhbj57cHJvcHMucmVjb3JkLnBhcmFtcy50aXRsZX08L3NwYW4+PGJyLz48YnIvPlxyXG5cdFx0XHQ8YSBocmVmPXtwcm9wcy5yZWNvcmQucGFyYW1zLmxpbmt9IHRhcmdldD1cIl9ibGFua1wiID5cclxuXHRcdFx0XHQ8ZGl2IHN0eWxlPXt7XHJcblx0XHRcdFx0XHRwYWRkaW5nOiAnNXB4JyxcclxuXHRcdFx0XHRcdCdiYWNrZ3JvdW5kLWNvbG9yJzogJ2RhcmtncmF5JyxcclxuXHRcdFx0XHRcdGNvbG9yOiAnd2hpdGUnLFxyXG5cdFx0XHRcdFx0J2JvcmRlci1yYWRpdXMnOiAnNXB4JyxcclxuXHRcdFx0XHRcdCd0ZXh0LWFsaWduJzogJ2NlbnRlcicsXHJcblx0XHRcdFx0fX0+XHJcblx0XHRcdFx0XHQ8c3Bhbj5TZWUgYW5ub3VuY2VtZW50IHRvIGh0dHBzOjwvc3Bhbj48YnIvPlxyXG5cdFx0XHRcdFx0PHNwYW4+d3d3Lm1vYmlsZS5iZzwvc3Bhbj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0PC9hPlxyXG5cdFx0PC9kaXY+XHJcblx0KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDdXN0b21UaXRsZSIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0ICB9IGZyb20gJ3JlYWN0J1xyXG4vLyBpbXBvcnQgJy4vc3R5bGUvc3R5bGUuY3NzJ1xyXG4vLyBpbXBvcnQgc3R5bGVzIGZyb20gJy4vc3R5bGUvc3R5bGUuY3NzJ1xyXG5cclxuY29uc3QgY2F0ZWdvcmllcyA9IFtcclxuXHRcIk1lcmNlZGVzLUJlbnpcIixcclxuXHRcIkJNV1wiLFxyXG5cdFwiQXVkaVwiLFxyXG5cdFwiVldcIixcclxuXHRcIlRveW90YVwiLFxyXG5cdFwiT3BlbFwiLFxyXG5cdFwiUGV1Z2VvdFwiXHJcbl1cclxuY29uc3QgdHlwZVRyYW5zbWlzc2lvbiA9IHtcclxuXHQnbWFudWFsJzogJ9Cg0YrRh9C90LAnLFxyXG5cdCdhdXRvbWF0aWMnOiAn0JDQstGC0L7QvNCw0YLQuNGH0L3QsCcsXHJcblx0J3NlbWlfYXV0b21hdGljJzogJ9Cf0L7Qu9GD0LDQstGC0L7QvNCw0YLQuNGH0L3QsCdcclxufVxyXG5cclxuY29uc3QgQ29udGVudFBhcnNlciA9ICgpID0+IHtcclxuXHRjb25zdCBbYnJhbmRzLCBzZXRCcmFuZHNdID0gdXNlU3RhdGUoW10pXHJcblx0Y29uc3QgW21vZGVscywgc2V0TW9kZWxzXSA9IHVzZVN0YXRlKFtdKVxyXG5cdGNvbnN0IFtzZWxlY3RlZEJyYW5kLCBzZXRTZWxlY3RlZEJyYW5kXSA9IHVzZVN0YXRlKCcnKVxyXG5cdGNvbnN0IFtzZWxlY3RlZE1vZGVsLCBzZXRTZWxlY3RlZE1vZGVsXSA9IHVzZVN0YXRlKCcnKVxyXG5cdGNvbnN0IFt1cmwsIHNldFVybF0gPSB1c2VTdGF0ZSgnaHR0cHM6Ly93d3cubW9iaWxlLmJnJylcclxuXHRjb25zdCBbcHJvZHVjdGlvblllYXJGcm9tLCBzZXRQcm9kdWN0aW9uWWVhckZyb21dID0gdXNlU3RhdGUoJzIwMTcnKVxyXG5cdGNvbnN0IFtwcm9kdWN0aW9uWWVhclRvLCBzZXRQcm9kdWN0aW9uWWVhclRvXSA9IHVzZVN0YXRlKCcnKVxyXG5cdGNvbnN0IFtwcmljZUZyb20sIHNldFByaWNlRnJvbV0gPSB1c2VTdGF0ZSgnJylcclxuXHRjb25zdCBbcHJpY2VUbywgc2V0UHJpY2VUb10gPSB1c2VTdGF0ZSgnJylcclxuXHRjb25zdCBbZXJyb3JzLCBzZXRFcnJvcnNdID0gdXNlU3RhdGUoe30pXHJcblx0Ly8gY29uc3QgdmFsaWRhdGUgPSAoKSA9PiB7XHJcblx0Ly8gXHRjb25zdCBuZXdFcnJvcnMgPSB7fVxyXG5cdC8vIFx0aWYgKCFzZWxlY3RlZENhdGVnb3J5KSBuZXdFcnJvcnMuc2VsZWN0ZWRCcmFuZCA9ICdDYXRlZ29yeSBpcyByZXF1aXJlZCdcclxuXHQvL1xyXG5cdC8vIFx0cmV0dXJuIG5ld0Vycm9yc1xyXG5cdC8vIH1cclxuXHRjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyBldmVudCA9PiB7XHJcblx0XHRjb25zb2xlLmxvZygnZXZlbnQgLT4gJywgZXZlbnQpXHJcblxyXG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG5cdFx0Ly8gY29uc3QgbmV3RXJyb3JzID0gdmFsaWRhdGUoKVxyXG5cdFx0Ly8gaWYgKE9iamVjdC5rZXlzKG5ld0Vycm9ycykubGVuZ3RoID4gMCkge1xyXG5cdFx0Ly8gXHRzZXRFcnJvcnMobmV3RXJyb3JzKVxyXG5cdFx0Ly8gXHRyZXR1cm5cclxuXHRcdC8vIH1cclxuXHRcdGNvbnN0IGRhdGEgPSB7XHJcblx0XHRcdHVybCxcclxuXHRcdFx0c2VsZWN0ZWRCcmFuZCxcclxuXHRcdFx0c2VsZWN0ZWRNb2RlbCxcclxuXHRcdFx0cHJvZHVjdGlvblllYXJGcm9tLFxyXG5cdFx0XHRwcm9kdWN0aW9uWWVhclRvLFxyXG5cdFx0XHRwcmljZUZyb20sXHJcblx0XHRcdHByaWNlVG8sXHJcblx0XHR9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2Fubm91bmNlbWVudHMvcGFyc2luZ0NvbnRlbnRCeVBhcmFtcycsIHtcclxuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcclxuXHRcdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnRGF0YSBzdWJtaXR0ZWQgc3VjY2Vzc2Z1bGx5JylcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc3VibWl0IGRhdGEnKVxyXG5cdFx0XHR9XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vIEZldGNoIGJyYW5kcyBvbiBjb21wb25lbnQgbW91bnRcclxuXHR1c2VFZmZlY3QoKCkgPT4ge1xyXG5cdFx0ZmV0Y2goJy9icmFuZC9tb2RlbHMvb3B0aW9ucz9vcHRpb249YnJhbmRzJylcclxuXHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG5cdFx0XHQudGhlbihkYXRhID0+IHtcclxuXHRcdFx0XHRzZXRCcmFuZHMoZGF0YS5vcHRpb25zKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGJyYW5kczonLCBlcnJvcilcclxuXHRcdFx0fSlcclxuXHR9LCBbXSlcclxuXHJcblx0Ly8gRmV0Y2ggbW9kZWxzIHdoZW4gYSBicmFuZCBpcyBzZWxlY3RlZFxyXG5cdHVzZUVmZmVjdCgoKSA9PiB7XHJcblx0XHRpZiAoc2VsZWN0ZWRCcmFuZCkge1xyXG5cdFx0XHRmZXRjaChgL2JyYW5kL21vZGVscy9vcHRpb25zP29wdGlvbj0ke3NlbGVjdGVkQnJhbmR9YClcclxuXHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcblx0XHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0XHRzZXRNb2RlbHMoZGF0YS5vcHRpb25zKVxyXG5cclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCdkYXRhLm9wdGlvbnMgLT4gJywgZGF0YS5vcHRpb25zKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmNhdGNoKGVycm9yID0+IHtcclxuXHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIG1vZGVsczonLCBlcnJvcilcclxuXHRcdFx0XHR9KVxyXG5cdFx0fVxyXG5cdH0sIFtzZWxlY3RlZEJyYW5kXSlcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tLXBhZ2VcIj5cclxuXHRcdFx0PGgxPlBhcnNlciBmb3JtPC9oMT48YnIvPlxyXG5cdFx0XHQ8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fT5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cclxuXHRcdFx0XHRcdDxsYWJlbCBodG1sRm9yPVwiYnJhbmRcIj5CcmFuZDo8L2xhYmVsPlxyXG5cdFx0XHRcdFx0PHNlbGVjdFxyXG5cdFx0XHRcdFx0XHRpZD1cImJyYW5kXCJcclxuXHRcdFx0XHRcdFx0dmFsdWU9e3NlbGVjdGVkQnJhbmR9XHJcblx0XHRcdFx0XHRcdG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRCcmFuZChlLnRhcmdldC52YWx1ZSl9XHJcblx0XHRcdFx0XHQ+XHJcblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYSBicmFuZDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHR7YnJhbmRzLm1hcChicmFuZCA9PiAoXHJcblx0XHRcdFx0XHRcdFx0PG9wdGlvbiBrZXk9e2JyYW5kfSB2YWx1ZT17YnJhbmR9PlxyXG5cdFx0XHRcdFx0XHRcdFx0e2JyYW5kfVxyXG5cdFx0XHRcdFx0XHRcdDwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdFx0e2Vycm9ycy5zZWxlY3RlZEJyYW5kICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5zZWxlY3RlZEJyYW5kfTwvc3Bhbj59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XHJcblx0XHRcdFx0XHQ8bGFiZWwgaHRtbEZvcj1cIm1vZGVsXCI+TW9kZWw6PC9sYWJlbD5cclxuXHRcdFx0XHRcdDxzZWxlY3RcclxuXHRcdFx0XHRcdFx0aWQ9XCJtb2RlbFwiXHJcblx0XHRcdFx0XHRcdHZhbHVlPXtzZWxlY3RlZE1vZGVsfVxyXG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17KGUpID0+IHNldFNlbGVjdGVkTW9kZWwoZS50YXJnZXQudmFsdWUpfVxyXG5cdFx0XHRcdFx0PlxyXG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IGEgbW9kZWw8L29wdGlvbj5cclxuXHRcdFx0XHRcdFx0e21vZGVscy5tYXAobW9kZWwgPT4gKFxyXG5cdFx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXttb2RlbH0gdmFsdWU9e21vZGVsfT5cclxuXHRcdFx0XHRcdFx0XHRcdHttb2RlbH1cclxuXHRcdFx0XHRcdFx0XHQ8L29wdGlvbj5cclxuXHRcdFx0XHRcdFx0KSl9XHJcblx0XHRcdFx0XHQ8L3NlbGVjdD5cclxuXHRcdFx0XHRcdHtlcnJvcnMuc2VsZWN0ZWRNb2RlbCAmJiA8c3BhbiBjbGFzc05hbWU9XCJlcnJvclwiPntlcnJvcnMuc2VsZWN0ZWRNb2RlbH08L3NwYW4+fVxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxyXG5cdFx0XHRcdFx0PGxhYmVsPlByb2R1Y3Rpb24gWWVhcnMgKGJ5IGRlZmF1bHQgaXMgMjAxNyk6PC9sYWJlbD5cclxuXHRcdFx0XHRcdDxzZWxlY3QgdmFsdWU9e3Byb2R1Y3Rpb25ZZWFyRnJvbX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRQcm9kdWN0aW9uWWVhckZyb20oZS50YXJnZXQudmFsdWUpfT5cclxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIjIwMTdcIj5TZWxlY3QgeWVhcjwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHR7eWVhcnNGcm9tQW55VG9DdXJyZW50KCkubWFwKCh5ZWFyLCBpbmRleCkgPT4gKFxyXG5cdFx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e3llYXJ9Pnt5ZWFyfTwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdFx0ey8qPGlucHV0IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIkZyb21cIiB2YWx1ZT17cHJvZHVjdGlvblllYXJGcm9tfSBvbkNoYW5nZT17KGUpID0+IHNldFByb2R1Y3Rpb25ZZWFyRnJvbShlLnRhcmdldC52YWx1ZSl9IC8+Ki99XHJcblx0XHRcdFx0XHR7ZXJyb3JzLnByb2R1Y3Rpb25ZZWFyRnJvbSAmJiA8c3BhbiBjbGFzc05hbWU9XCJlcnJvclwiPntlcnJvcnMucHJvZHVjdGlvblllYXJGcm9tfTwvc3Bhbj59XHJcblx0XHRcdFx0XHQ8c2VsZWN0IHZhbHVlPXtwcm9kdWN0aW9uWWVhclRvfSBvbkNoYW5nZT17KGUpID0+IHNldFByb2R1Y3Rpb25ZZWFyVG8oZS50YXJnZXQudmFsdWUpfT5cclxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT1cIlwiPjwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHR7eWVhcnNGcm9tQW55VG9DdXJyZW50KCkubWFwKCh5ZWFyLCBpbmRleCkgPT4gKFxyXG5cdFx0XHRcdFx0XHRcdDxvcHRpb24ga2V5PXtpbmRleH0gdmFsdWU9e3llYXJ9Pnt5ZWFyfTwvb3B0aW9uPlxyXG5cdFx0XHRcdFx0XHQpKX1cclxuXHRcdFx0XHRcdDwvc2VsZWN0PlxyXG5cdFx0XHRcdFx0ey8qPGlucHV0IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlRvXCIgdmFsdWU9e3Byb2R1Y3Rpb25ZZWFyVG99Ki99XHJcblx0XHRcdFx0XHR7LyogICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQcm9kdWN0aW9uWWVhclRvKGUudGFyZ2V0LnZhbHVlKX0vPiovfVxyXG5cdFx0XHRcdFx0e2Vycm9ycy5wcm9kdWN0aW9uWWVhclRvICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5wcm9kdWN0aW9uWWVhclRvfTwvc3Bhbj59XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHByaWNlLWludGVydmFsXCIgc3R5bGU9e3snbWFyZ2luLWJvdHRvbSc6ICcxNXB4J319PlxyXG5cdFx0XHRcdFx0PGxhYmVsPlByaWNlOjwvbGFiZWw+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImludGVydmFsXCI+XHJcblx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgcGxhY2Vob2xkZXI9XCJGcm9tXCIgdmFsdWU9e3ByaWNlRnJvbX0gb25DaGFuZ2U9eyhlKSA9PiBzZXRQcmljZUZyb20oZS50YXJnZXQudmFsdWUpfS8+XHJcblx0XHRcdFx0XHRcdHtlcnJvcnMucHJpY2VGcm9tICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5wcmljZUZyb219PC9zcGFuPn1cclxuXHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBwbGFjZWhvbGRlcj1cIlRvXCIgdmFsdWU9e3ByaWNlVG99IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJpY2VUbyhlLnRhcmdldC52YWx1ZSl9Lz5cclxuXHRcdFx0XHRcdFx0e2Vycm9ycy5wcmljZVRvICYmIDxzcGFuIGNsYXNzTmFtZT1cImVycm9yXCI+e2Vycm9ycy5wcmljZVRvfTwvc3Bhbj59XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+UnVuIHBhcnNlcjwvYnV0dG9uPlxyXG5cdFx0XHQ8L2Zvcm0+XHJcblx0XHQ8L2Rpdj5cclxuXHQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHllYXJzRnJvbUFueVRvQ3VycmVudChzdGFydFllYXIgPSAyMDE3KSB7XHJcblx0Y29uc3QgY3VycmVudFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKClcclxuXHRjb25zdCB5ZWFycyA9IFtdXHJcblxyXG5cdGZvciAobGV0IHllYXIgPSBzdGFydFllYXI7IHllYXIgPD0gY3VycmVudFllYXI7IHllYXIrKykge1xyXG5cdFx0eWVhcnMucHVzaCh5ZWFyKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHllYXJzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRQYXJzZXJcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyBTaG93UHJvcGVydHlQcm9wcyB9IGZyb20gJ2FkbWluanMnXHJcbmltcG9ydCB7IEJveCB9IGZyb20gJ0BhZG1pbmpzL2Rlc2lnbi1zeXN0ZW0nXHJcblxyXG5jb25zdCBTZXR0aW5nc1BhZ2UgPSAocHJvcHMpID0+IHtcclxuXHRjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZSkgPT4ge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwODAvb3B0aW9ucy9jcmVhdGUnLCB7XHJcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXHJcblx0XHRcdFx0aGVhZGVyczoge1xyXG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdGJvZHk6IEpTT04uc3RyaW5naWZ5KHt9KSxcclxuXHRcdFx0fSlcclxuXHRcdFx0Y29uc29sZS5sb2coJ1JlY29yZCBzYXZlZDonLCByZXNwb25zZS5kYXRhKVxyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0Y29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHJlY29yZDonLCBlcnJvcilcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiAoXHJcblx0XHQ8ZGl2IGlkPVwic2V0dGluZ3MtcGFnZVwiPlxyXG5cdFx0XHQ8aDI+PHNwYW4+U2V0dGluZ3M8L3NwYW4+PC9oMj48YnIvPlxyXG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PkluaXQ8L2J1dHRvbj5cclxuXHRcdDwvZGl2PlxyXG5cdClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NQYWdlIiwiQWRtaW5KUy5Vc2VyQ29tcG9uZW50cyA9IHt9XG5pbXBvcnQgQ3VzdG9tSW1hZ2UgZnJvbSAnLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL0N1c3RvbUltYWdlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21JbWFnZSA9IEN1c3RvbUltYWdlXG5pbXBvcnQgQ3VzdG9tVGl0bGUgZnJvbSAnLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL0N1c3RvbVRpdGxlJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5DdXN0b21UaXRsZSA9IEN1c3RvbVRpdGxlXG5pbXBvcnQgQ29udGVudFBhcnNlclBhZ2UgZnJvbSAnLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL0NvbnRlbnRQYXJzZXInXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkNvbnRlbnRQYXJzZXJQYWdlID0gQ29udGVudFBhcnNlclBhZ2VcbmltcG9ydCBTZXR0aW5nc1BhZ2UgZnJvbSAnLi4vc3JjL2FwaS9hZG1pbi1qcy9jb21wb25lbnRzL1NldHRpbmdzUGFnZSdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuU2V0dGluZ3NQYWdlID0gU2V0dGluZ3NQYWdlIl0sIm5hbWVzIjpbIkN1c3RvbUltYWdlIiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInNyYyIsInJlY29yZCIsInBhcmFtcyIsImltZyIsImFsdCIsInRpdGxlIiwic3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIkN1c3RvbVRpdGxlIiwiaHJlZiIsImxpbmsiLCJ0YXJnZXQiLCJwYWRkaW5nIiwiY29sb3IiLCJDb250ZW50UGFyc2VyIiwiYnJhbmRzIiwic2V0QnJhbmRzIiwidXNlU3RhdGUiLCJtb2RlbHMiLCJzZXRNb2RlbHMiLCJzZWxlY3RlZEJyYW5kIiwic2V0U2VsZWN0ZWRCcmFuZCIsInNlbGVjdGVkTW9kZWwiLCJzZXRTZWxlY3RlZE1vZGVsIiwidXJsIiwic2V0VXJsIiwicHJvZHVjdGlvblllYXJGcm9tIiwic2V0UHJvZHVjdGlvblllYXJGcm9tIiwicHJvZHVjdGlvblllYXJUbyIsInNldFByb2R1Y3Rpb25ZZWFyVG8iLCJwcmljZUZyb20iLCJzZXRQcmljZUZyb20iLCJwcmljZVRvIiwic2V0UHJpY2VUbyIsImVycm9ycyIsInNldEVycm9ycyIsImhhbmRsZVN1Ym1pdCIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsInByZXZlbnREZWZhdWx0IiwiZGF0YSIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsImVycm9yIiwidXNlRWZmZWN0IiwidGhlbiIsImpzb24iLCJvcHRpb25zIiwiY2F0Y2giLCJjbGFzc05hbWUiLCJvblN1Ym1pdCIsImh0bWxGb3IiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZSIsIm1hcCIsImJyYW5kIiwia2V5IiwibW9kZWwiLCJ5ZWFyc0Zyb21BbnlUb0N1cnJlbnQiLCJ5ZWFyIiwiaW5kZXgiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJzdGFydFllYXIiLCJjdXJyZW50WWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInllYXJzIiwicHVzaCIsIlNldHRpbmdzUGFnZSIsIm9uQ2xpY2siLCJBZG1pbkpTIiwiVXNlckNvbXBvbmVudHMiLCJDb250ZW50UGFyc2VyUGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztDQUlBLE1BQU1BLFdBQVcsR0FBSUMsS0FBSyxJQUFLO0dBQzlCLG9CQUNDQyxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0NBQUtDLElBQUFBLEVBQUUsRUFBQyxrQkFBQTtJQUNQRixlQUFBQSxzQkFBQSxDQUFBQyxhQUFBLENBQUEsS0FBQSxFQUFBO0NBQUtFLElBQUFBLEdBQUcsRUFBRUosS0FBSyxDQUFDSyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0MsR0FBSTtDQUFDQyxJQUFBQSxHQUFHLEVBQUVS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
