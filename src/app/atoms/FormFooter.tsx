type FormFooterProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent) => void; // Accept an event argument
};

const FormFooter: React.FC<FormFooterProps> = ({ onClose, onSubmit }) => (
  <div className="flex gap-4 justify-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
    <button
      type="submit"
      className="text-grey font-semibold rounded-sm text-sm px-5 py-2.5 text-center hover:text-green min-w-[120px]"
    >
      Salvar e criar outra
    </button>
    <button
      type="submit"
      onClick={onSubmit}
      className="flex items-center justify-center min-w-[120px]"
    >
      <svg
        width="70"
        height="69"
        viewBox="0 0 70 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-green500 hover:text-green800"
      >
        <path
          d="M34.6856 0C15.6343 0 0.046875 15.525 0.046875 34.5C0.046875 53.475 15.6343 69 34.6856 69C53.737 69 69.3244 53.475 69.3244 34.5C69.3244 15.525 53.737 0 34.6856 0ZM49.2339 28.635L32.6073 45.195C31.2218 46.575 29.1434 46.575 27.7579 45.195L20.1374 37.605C18.7518 36.225 18.7518 34.155 20.1374 32.775C21.5229 31.395 23.6012 31.395 24.9868 32.775L30.1826 37.95L44.3845 23.805C45.77 22.425 47.8484 22.425 49.2339 23.805C50.6195 25.185 50.6195 27.255 49.2339 28.635Z"
          fill="currentColor"
        />
      </svg>
    </button>
    <button
      type="button"
      onClick={onClose}
      className="text-grey hover:text-green font-semibold rounded-sm text-sm px-5 py-2.5 text-center min-w-[120px]"
    >
      Cancelar
    </button>
  </div>
);

export default FormFooter;
