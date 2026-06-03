###
# This is the most efficient solution I could think of and earns full credit
# Works by sorting list then creating a new list (maxs) and storing them by at index a[idx]%K; maxs[a[idx]%K] = a[idx] if it is greater than prev
# Since the values at different indexes in the list 'a' won't ever be the same no matter how many times you increment them by K, we only worry about the ones at the same index
# medium greedy problem imo
###
T = int(input())
for _ in range(T):
    N, K = map(int, input().split())
    a = sorted(list(map(int, input().split())))
    if K>0:
        
        maxs = [0]*(abs(K))
        res = 0
        for x in range(N):
            if maxs[a[x]%K]<a[x]:
                maxs[a[x]%K] = a[x]
                
            elif maxs[a[x]%K]==a[x]:
                res+=1
                maxs[a[x]%K]+=K
                
            else:
                if maxs[a[x]%K] == 0:
                    maxs[a[x]%K] = a[x]
                else:
                    res+=abs((maxs[a[x]%K]-a[x])//K)+1
                    maxs[a[x]%K] += K
        

        print(res)
    else:
        maxs = [0]*(abs(K))
        used = [0]*(abs(K))
        res = 0
        for x in range(N-1,-1,-1):
            #print(maxs)
            if maxs[a[x]%K]>a[x]:
                maxs[a[x]%K] = a[x]
                
            elif maxs[a[x]%K]==a[x]:
                
                res+=1
                maxs[a[x]%K]+=K
                
            else:
                if used[a[x]%K] == 0:
                    maxs[a[x]%K] = a[x]
                    used[a[x]%K] = 1
                else:
                    res+=abs((maxs[a[x]%K]-a[x])//K)+1
                    maxs[a[x]%K] += K
        print(res)
