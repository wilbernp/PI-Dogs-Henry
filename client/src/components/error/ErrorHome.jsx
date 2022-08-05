import s from './error.module.css'

export default function Loading() {
    return (
      <div className={s.spinner_container}>
        <div className={s.loading_spinner}>
            sin internet
        </div>
      </div>
    );
  }