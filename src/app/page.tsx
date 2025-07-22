import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Dynamic Form Builder
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create beautiful, interactive forms with our drag-and-drop builder. 
            Generate code for React, Vue, HTML, and more.
          </p>
          
          <div className="flex gap-4 justify-center mb-16">
            <Link
              href="/form-builder"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Building
            </Link>
            <a
              href="https://github.com/chirag640/dynamic_json_form_builder"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 text-gray-300 bg-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-700 hover:text-white transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Drag & Drop Builder</h3>
            <p className="text-gray-300">
              Build forms visually with our intuitive drag-and-drop interface. No coding required.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Multi-Framework Support</h3>
            <p className="text-gray-300">
              Generate clean, production-ready code for React, Vue.js, HTML, and more.
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Validation</h3>
            <p className="text-gray-300">
              Built-in validation with custom rules, conditional logic, and real-time feedback.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Supported Field Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {[
              '📝 Text Input',
              '✉️ Email',
              '🔒 Password',
              '🔢 Number',
              '📞 Phone',
              '📄 Textarea',
              '⬇️ Dropdown',
              '⚪ Radio Button',
              '☑️ Checkbox',
              '📋 Multi-select',
              '📅 Date Picker',
              '🎚️ Slider',
              '⭐ Rating',
              '🎨 Color Picker',
              '📁 File Upload'
            ].map((field) => (
              <div key={field} className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg shadow-sm text-sm text-gray-200 hover:bg-gray-700 transition-colors">
                {field}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}