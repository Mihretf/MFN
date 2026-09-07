import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Link, Zap } from 'lucide-react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({}); setActiveNodeId(null); setPulseEffect({}); setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const n = { ...prev };
      Object.keys(n).forEach((k) => { if (parseInt(k) !== id) n[parseInt(k)] = false; });
      n[id] = !prev[id];
      if (!prev[id]) {
        setActiveNodeId(id); setAutoRotate(false);
        const rel = getRelatedItems(id);
        const pulse = {}; rel.forEach((r) => { pulse[r] = true; }); setPulseEffect(pulse);
        centerViewOnNode(id);
      } else { setActiveNodeId(null); setAutoRotate(true); setPulseEffect({}); }
      return n;
    });
  };

  useEffect(() => {
    let timer;
    if (autoRotate) { timer = setInterval(() => { setRotationAngle((p) => Number(((p + 0.3) % 360).toFixed(3))); }, 50); }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId) => {
    const idx = timelineData.findIndex((i) => i.id === nodeId);
    setRotationAngle(270 - (idx / timelineData.length) * 360);
  };

  const calcPos = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const r = 200; const rad = (angle * Math.PI) / 180;
    return { x: r * Math.cos(rad), y: r * Math.sin(rad), zIndex: Math.round(100 + 50 * Math.cos(rad)), opacity: Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2))) };
  };

  const getRelatedItems = (id) => { const item = timelineData.find((i) => i.id === id); return item ? item.relatedIds : []; };
  const isRelatedToActive = (id) => { if (!activeNodeId) return false; return getRelatedItems(activeNodeId).includes(id); };

  const statusStyles = (s) => s === 'completed' ? 'text-white bg-black border-white' : s === 'in-progress' ? 'text-black bg-white border-black' : 'text-white bg-black/40 border-white/50';

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden' ref={containerRef} onClick={handleContainerClick}>
      <div className='relative w-full max-w-4xl h-full flex items-center justify-center'>
        <div className='absolute w-full h-full flex items-center justify-center' ref={orbitRef} style={{ perspective: '1000px' }}>
          <div className='absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10'>
            <div className='absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70'></div>
            <div className='absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50' style={{ animationDelay: '0.5s' }}></div>
            <div className='w-8 h-8 rounded-full bg-white/80 backdrop-blur-md'></div>
          </div>
          <div className='absolute w-96 h-96 rounded-full border border-white/10'></div>
          {timelineData.map((item, index) => {
            const pos = calcPos(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;
            return (
              <div key={item.id} ref={(el) => (nodeRefs.current[item.id] = el)} className='absolute transition-all duration-700 cursor-pointer' style={{ transform: 'translate(' + pos.x + 'px,' + pos.y + 'px)', zIndex: isExpanded ? 200 : pos.zIndex, opacity: isExpanded ? 1 : pos.opacity }} onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}>
                <div className={'absolute rounded-full ' + (isPulsing ? 'animate-pulse duration-1000' : '')} style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)', width: (item.energy * 0.5 + 40) + 'px', height: (item.energy * 0.5 + 40) + 'px', left: '-' + (item.energy * 0.5 + 40 - 40) / 2 + 'px', top: '-' + (item.energy * 0.5 + 40 - 40) / 2 + 'px' }}></div>
                <div className={'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ' + (isExpanded ? 'bg-white text-black border-white shadow-lg shadow-white/30 scale-150' : isRelated ? 'bg-white/50 text-black border-white animate-pulse' : 'bg-black text-white border-white/40')}>
                  <Icon size={16} />
                </div>
                <div className={'absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ' + (isExpanded ? 'text-white scale-125' : 'text-white/70')}>{item.title}</div>
                {isExpanded && (
                  <Card className='absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl'>
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50'></div>
                    <CardHeader className='pb-2'>
                      <div className='flex justify-between items-center'>
                        <Badge className={'px-2 text-xs ' + statusStyles(item.status)}>{item.status === 'completed' ? 'COMPLETE' : item.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING'}</Badge>
                        <span className='text-xs font-mono text-white/50'>{item.date}</span>
                      </div>
                      <CardTitle className='text-sm mt-2'>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className='text-xs text-white/80'>
                      <p>{item.content}</p>
                      <div className='mt-4 pt-3 border-t border-white/10'>
                        <div className='flex justify-between items-center text-xs mb-1'>
                          <span className='flex items-center'><Zap size={10} className='mr-1' />Energy</span>
                          <span className='font-mono'>{item.energy}%</span>
                        </div>
                        <div className='w-full h-1 bg-white/10 rounded-full overflow-hidden'>
                          <div className='h-full bg-gradient-to-r from-blue-500 to-purple-500' style={{ width: item.energy + '%' }}></div>
                        </div>
                      </div>
                      {item.relatedIds.length > 0 && (
                        <div className='mt-4 pt-3 border-t border-white/10'>
                          <div className='flex items-center mb-2'><Link size={10} className='text-white/70 mr-1' /><h4 className='text-xs uppercase tracking-wider font-medium text-white/70'>Connected</h4></div>
                          <div className='flex flex-wrap gap-1'>
                            {item.relatedIds.map((rId) => {
                              const rItem = timelineData.find((i) => i.id === rId);
                              return (
                                <Button key={rId} variant='outline' size='sm' className='flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white' onClick={(e) => { e.stopPropagation(); toggleItem(rId); }}>
                                  {rItem?.title}<ArrowRight size={8} className='ml-1 text-white/60' />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
