import React from 'react';

const InputField = (props) => {
  const { labelName } = props;
  return (
    <div>
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        {labelName}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
        {...props}
      />
    </div>
  );
};

export default InputField;