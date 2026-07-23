function SectionHeading({ title, subtitle }) {
  return (
   <div className="text-center mb-12">
      <h2 className="text-4xl font-bold">{title}</h2>

      {subtitle && (
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;