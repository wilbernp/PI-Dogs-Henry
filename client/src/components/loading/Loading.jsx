import s from './loading.module.css'

export default function Loading() {
    return (
      <div className={s.spinner_container}>
        <div className={s.loading_spinner}>
        </div>
      </div>
    );
  }