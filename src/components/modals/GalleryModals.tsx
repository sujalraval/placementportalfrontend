import { Icon } from '@/components/icons/Icon'
import type { GalleryPhoto, GalleryVideo } from '@/data/mock/gallery'

export function GalleryPhotoModal({ photo }: { photo: GalleryPhoto }) {
  return (
    <div>
      <div className="relative h-[280px] overflow-hidden rounded-[10px]" style={{ background: photo.c }}>
        <div className="absolute inset-0 grid place-items-center opacity-20">
          <Icon name="image" className="h-14 w-14 text-white" />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3.5 py-3 text-white">
          <b className="block text-[12.5px]">{photo.cap}</b>
          <span className="text-[10.5px] opacity-85">{photo.tag}</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted">
        Placeholder frame — replace with the university's own photograph for this moment.
      </p>
    </div>
  )
}

export function GalleryVideoModal({ video }: { video: GalleryVideo }) {
  return (
    <div>
      <div className="flex aspect-video flex-col items-center justify-center gap-2.5 rounded-[10px] bg-[#0b0f1a] text-white">
        <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-white bg-white/10">
          <Icon name="play" className="h-7 w-7 fill-white text-white" />
        </div>
        <div className="text-[12.5px] text-[#cfd6e4]">{video.dur} · video would play here</div>
      </div>
      <p className="mt-3 text-[12.5px] text-[#46443d]">{video.cap}</p>
      <p className="mt-1.5 text-[11.5px] text-muted">
        Placeholder player — connect to the university's hosted video (YouTube/Vimeo embed or MP4) at deployment.
      </p>
    </div>
  )
}
