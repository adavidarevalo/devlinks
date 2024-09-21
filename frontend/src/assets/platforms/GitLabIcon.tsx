export default function GitLabIcon({
    color
}: {
    color?: boolean
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
            <path fill={color ? 'var(--clr-white-pri)' : "#737373"} d="m14.442 6.658-.019-.048-1.812-4.73a.474.474 0 0 0-.471-.299.474.474 0 0 0-.436.348L10.48 5.68H5.52L4.295 1.93a.474.474 0 0 0-.434-.35.48.48 0 0 0-.472.3L1.575 6.618l-.02.046a3.371 3.371 0 0 0 1.117 3.893l.007.004.016.013 2.764 2.07 1.367 1.034.831.63a.562.562 0 0 0 .678 0l.83-.63 1.368-1.035 2.78-2.082.008-.005a3.37 3.37 0 0 0 1.12-3.897Z"/>
        </svg>
    )
}