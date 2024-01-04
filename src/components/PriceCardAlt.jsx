const checkIcon = (
  <svg
    class='flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
  </svg>
);

const unCheckIcon = (
  <svg
    class='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
  </svg>
);

const PriceCardAlt = ({ planName, monthlyPrice, listItems, callback, id }) => {
  return (
    <div class='flex flex-col justify-center items-center'>
      <div class='flex items-baseline text-gray-900 dark:text-white'>
        <span class='text-3xl font-semibold'>R</span>
        <span class='text-5xl font-extrabold tracking-tight'>{monthlyPrice}</span>
        <span class='ms-1 text-xl font-normal text-gray-500 dark:text-gray-400'>/month</span>
      </div>
      <ul role='list' class='space-y-5 my-7'>
        {listItems.map((item, index) =>
          item.include ? (
            <li class='flex items-center'>
              {checkIcon}
              <span class='text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3'>
                {item.description}
              </span>
            </li>
          ) : (
            <li class='flex line-through decoration-gray-500'>
              {unCheckIcon}
              <span class='text-base font-normal leading-tight text-gray-500 ms-3'>{item.description}</span>
            </li>
          )
        )}
      </ul>
      <button
        type='button'
        class='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-64 text-center'
        id={id}
        onClick={(e) => callback(e)}
      >
        Choose plan
      </button>
    </div>
  );
};

export default PriceCardAlt;
