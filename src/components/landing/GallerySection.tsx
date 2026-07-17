import { useState } from 'react'
import { Icon } from '@/components/icons/Icon'
import { SectionHead } from '@/components/landing/SectionHead'
import { useModal } from '@/context/ModalContext'
import { GalleryPhotoModal, GalleryVideoModal } from '@/components/modals/GalleryModals'
import { GALLERY_PHOTOS, GALLERY_VIDEOS } from '@/data/mock/gallery'

export function GallerySection() {
  const [tab, setTab] = useState<'photo' | 'video'>('photo')
  const { openModal } = useModal()

  return (
    <section id="gallery" className="px-[30px] pb-[52px] max-lg:px-4 max-lg:pb-[38px]">
      <SectionHead
        eyebrow="Life on campus"
        title="Photo & video gallery"
        description="Moments from drives, workshops, and placement celebrations."
      />

      <div className="mb-5 flex justify-center gap-2">
        <button
          onClick={() => setTab('photo')}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-semibold ${
            tab === 'photo' ? 'border-navy bg-navy text-white' : 'border-line bg-white text-[#3a3833]'
          }`}
        >
          <Icon name="image" className="h-4 w-4" /> Photos
        </button>
        <button
          onClick={() => setTab('video')}
          className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[12.5px] font-semibold ${
            tab === 'video' ? 'border-navy bg-navy text-white' : 'border-line bg-white text-[#3a3833]'
          }`}
        >
          <Icon name="play" className="h-4 w-4" /> Videos
        </button>
      </div>

      {tab === 'photo' && (
        <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-1">
          {GALLERY_PHOTOS.map((p, i) => (
            <button
              key={i}
              onClick={() => openModal(p.cap, <GalleryPhotoModal photo={p} />)}
              className="relative h-[150px] overflow-hidden rounded-xl text-left transition-transform hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-18px_rgba(0,0,0,.4)]"
              style={{ background: p.c }}
            >
              <div className="absolute inset-0 grid place-items-center opacity-20">
                <Icon name="image" className="h-14 w-14 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-black/50 to-transparent px-3.5 py-3 text-white">
                <b className="block text-[12.5px]">{p.cap}</b>
                <span className="text-[10.5px] opacity-85">{p.tag}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'video' && (
        <div className="grid grid-cols-2 gap-3.5 max-lg:grid-cols-1">
          {GALLERY_VIDEOS.map((v, i) => (
            <button
              key={i}
              onClick={() => openModal(v.title, <GalleryVideoModal video={v} />)}
              className="overflow-hidden rounded-xl border border-line bg-white text-left transition-shadow hover:border-navy hover:shadow-[0_14px_30px_-18px_rgba(20,49,94,.5)]"
            >
              <div className="relative grid h-[120px] place-items-center bg-navy">
                <div className="grid h-[46px] w-[46px] place-items-center rounded-full bg-white/15">
                  <Icon name="play" className="h-[22px] w-[22px] fill-white text-white" />
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{v.dur}</span>
              </div>
              <div className="p-3.5">
                <b className="block text-[13px] text-navy">{v.title}</b>
                <p className="mt-1 text-[11.5px] leading-[1.4] text-muted">{v.cap}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
